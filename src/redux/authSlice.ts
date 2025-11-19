import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const token = localStorage.getItem('click_api_token');
const initialState: AuthState = {
    isAuthenticated: !!token,
    token: token,
    loading: false,
    error: null,
};

// Async thunk for logging in
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('Account/login', {
                Email: username,
                Password: password,
            });
            return {
                token: response.data.Token,
                refreshToken: response.data.RefreshToken,
            }; // Assuming your backend returns a token
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('click_api_token');
            localStorage.removeItem('click_api_refresh_token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string, refreshToken: string }>) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.loading = false;
                localStorage.setItem('click_api_token', action.payload.token);
                localStorage.setItem('click_api_refresh_token', action.payload.refreshToken);

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;
