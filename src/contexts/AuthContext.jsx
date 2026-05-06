import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../lib/axios"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const csrf = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
    } catch (err) {
      console.error("Gagal mendapatkan CSRF cookie", err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        setCurrentUser(response.data.user || response.data);
      } catch (err) {
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const register = async (data) => {
    setError(null);
    setIsLoading(true);

    try {
      await csrf(); 
      const response = await axios.post("/api/auth/register", data);

      setCurrentUser(response.data.user || response.data);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Pendaftaran gagal");
      setIsLoading(false);
      return false;
    }
  };

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      await csrf(); 
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      setCurrentUser(response.data.user || response.data);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  // TAMBAHAN: Fungsi Update Profile
  const updateProfile = async (data) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.put("/api/auth/profile", data);
      setCurrentUser(response.data.user || response.data);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Update profil gagal");
      setIsLoading(false);
      return false;
    }
  };

  // TAMBAHAN: Fungsi Update Password
  const updatePassword = async (currentPassword, newPassword, passwordConfirmation) => {
    setError(null);
    setIsLoading(true);

    try {
      await axios.put("/api/auth/password", {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: passwordConfirmation,
      });
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Update password gagal");
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
    updateProfile, // Mengekspor fungsi
    updatePassword, // Mengekspor fungsi
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth harus dalam AuthProvider");
  return context;
};