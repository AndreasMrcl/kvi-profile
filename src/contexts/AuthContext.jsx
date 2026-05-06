import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000/api";

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (name, email, password, passwordConfirmation) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Pendaftaran gagal");
        setIsLoading(false);
        return false;
      }

      setCurrentUser(data);
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMsg = err.message || "Terjadi kesalahan saat pendaftaran";
      setError(errorMsg);
      setIsLoading(false);
      return false;
    }
  };

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login gagal");
        setIsLoading(false);
        return false;
      }

      setCurrentUser(data);
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMsg = err.message || "Terjadi kesalahan saat login";
      setError(errorMsg);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setCurrentUser(null);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error("Logout error:", err);
      setCurrentUser(null);
      setIsLoading(false);
      return true;
    }
  };

  const updateProfile = async (name, email) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Update profil gagal");
        setIsLoading(false);
        return false;
      }

      setCurrentUser(data);
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMsg = err.message || "Terjadi kesalahan saat update profil";
      setError(errorMsg);
      setIsLoading(false);
      return false;
    }
  };

  const updatePassword = async (
    currentPassword,
    newPassword,
    passwordConfirmation,
  ) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/password`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Update password gagal");
        setIsLoading(false);
        return false;
      }

      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMsg = err.message || "Terjadi kesalahan saat update password";
      setError(errorMsg);
      setIsLoading(false);
      return false;
    }
  };

  const value = {
    currentUser,
    isLoading,
    error,
    register,
    login,
    logout,
    updateProfile,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan dalam AuthProvider");
  }
  return context;
};
