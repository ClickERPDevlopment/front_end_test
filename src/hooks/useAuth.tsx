import { createContext, useContext, useState, ReactNode, useEffect } from "react";


// Define AuthContext type
interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  logout: () => void;
}


// Correct way to create context
const AuthContext = createContext<AuthContextType | null>(null);


// AuthProvider component with error handling
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("click_api_token") || null);
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("click_api_refresh_token") || null);

  // Logout function
  const logout = () => {
    localStorage.removeItem("click_api_token");
    localStorage.removeItem("isCompanyByUser");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, setRefreshToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
