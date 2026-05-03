import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";

export const AuthContext = createContext(null);

const AUTH_TOKEN_KEY = "leadflow_auth_token";
const AUTH_CURRENT_USER_KEY = "leadflow_current_user";

const getStoredCurrentUser = () => {
  const savedCurrentUser = localStorage.getItem(AUTH_CURRENT_USER_KEY);

  if (!savedCurrentUser) {
    return null;
  }

  try {
    return JSON.parse(savedCurrentUser);
  } catch {
    return null;
  }
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const storedUser = getStoredCurrentUser();

      if (!token) {
        setAuthLoading(false);
        return;
      }

      if (storedUser) {
        setCurrentUser(storedUser);
      }

      try {
        const response = await api.get("/auth/me");
        setCurrentUser(response.data.user);
        localStorage.setItem(
          AUTH_CURRENT_USER_KEY,
          JSON.stringify(response.data.user)
        );
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_CURRENT_USER_KEY);
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    syncUser();
  }, []);

  const registerUser = async (formData) => {
    try {
      const response = await api.post("/auth/register", formData);
      const nextUser = response.data.user;

      localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
      localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(nextUser));
      setCurrentUser(nextUser);

      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed.",
      };
    }
  };

  const loginUser = async (formData) => {
    try {
      const response = await api.post("/auth/login", formData);
      const nextUser = response.data.user;

      localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
      localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(nextUser));
      setCurrentUser(nextUser);

      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed.",
      };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_CURRENT_USER_KEY);
    setCurrentUser(null);
  };

  const contextValue = {
    currentUser,
    authLoading,
    isAuthenticated: Boolean(currentUser),
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
