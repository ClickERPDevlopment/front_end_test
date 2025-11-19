import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Define the routes to exclude
const excludedRoutes = [
  '/auth/login',
  '/auth/register',
  // '/Account/refreshtoken'
  // Add any other routes you want to exclude
];

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Function to handle failed requests during token refresh
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

// Retry Settings
const MAX_RETRY = 3;
const RETRY_DELAY = 1000; // base 1 second

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Global retry interceptor
axiosInstance.interceptors.response.use(
  res => res,
  async (error) => {

    const originalRequest = error.config;

    // Do not retry refresh-token or unauthorized
    if (originalRequest?.url?.includes("refreshtoken")) return Promise.reject(error);
    if (error.response?.status === 401) return Promise.reject(error);

    // Initialize retry count
    originalRequest._retryCount = originalRequest._retryCount || 0;

    // Retry only network / server errors
    const retryableErrors = [0];

    if (
      retryableErrors.includes(error?.response?.status) &&
      originalRequest._retryCount < MAX_RETRY
    ) {
      originalRequest._retryCount++;

      // Exponential backoff
      const retryDelay = RETRY_DELAY * Math.pow(2, originalRequest._retryCount);

      console.log(
        `Retry ${originalRequest._retryCount}/${MAX_RETRY} in ${retryDelay}ms:`,
        originalRequest.url
      );

      await delay(retryDelay);

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Check if the request URL is in the excluded routes
    const isExcluded = excludedRoutes.some(route => config.url?.includes(route));

    // If the route is not excluded, add the Authorization header
    if (!isExcluded) {
      const token = localStorage.getItem('click_api_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    // Attach the cancel token from the singleton manager
    // const cancelTokenSource = getCancelTokenSource();
    // config.cancelToken = cancelTokenSource.token;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response, // pass through if successful
  error => {
    if (error.response && error.response.status === 401) {
      const errors = error.response.data;
      if (errors === 'Invalid credentials') {
        // Handle unauthorized error
        // console.error(errors, 'Unauthorized');
      }
    } else if (error.response && error.response.status === 404) {
      const errors = error.response.data;
      // console.error(errors, 'Not Found');

    }
    // Check if the error response has validation errors
    else if (error.response && error.response.data.errors) {
      const errors = error.response.data.errors;
      const errorMessages = Object.values(errors).flat().join(', '); // Get all error messages
      // console.error(errorMessages, 'Validation Error');
    }
    // Check for custom error message (for instance, when trying to delete a stage)
    else if (error.response && error.response.data.customError) {
      // console.error(error.response.data.customError, 'Custom Error');
    } else {
      // Generic error handling
      // console.error('An unexpected error occurred.', 'Error');
    }
    return Promise.reject(error);
  }
);

// Unified response error interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401 && !originalRequest._retry) {
      // Refresh in progress, queue the request
      if (isRefreshing) {
        return new Promise(resolve => {
          subscribeTokenRefresh(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      // Start refresh
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const click_api_refresh_token = localStorage.getItem('click_api_refresh_token');
        const oldAuthToken = localStorage.getItem('click_api_token');


        // Call refresh route with Authorization header (not in body!)
        const config = {
          headers: { Authorization: `Bearer ${oldAuthToken}` }
        };

        const response = await axios.post(
          `${API_BASE_URL}Account/refreshtoken`,
          {
            Token: oldAuthToken,
            RefreshToken: click_api_refresh_token
          },
          config
        );

        const newToken = response.data.click_api_token;

        localStorage.setItem('click_api_token', newToken);
        onRefreshed(newToken);

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem('click_api_token');
        localStorage.removeItem('click_api_refresh_token');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Other error types (optional)
    // if (status === 404) console.error('Not Found');
    // else if (status === 422) console.error('Validation Error');
    // else console.error('Unexpected Error');

    return Promise.reject(error);
  }
);

axiosInstance.defaults.headers.common['Cache-Control'] = 'no-cache';

export default axiosInstance;
