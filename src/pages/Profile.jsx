import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageHero from "../components/PageHero";

export default function Profile() {
  const navigate = useNavigate();
  const {
    currentUser,
    updateProfile,
    updatePassword,
    logout,
    isLoading,
    error: contextError,
  } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!profileForm.name || !profileForm.email) {
      setError("Semua field harus diisi");
      return;
    }

    const success_result = await updateProfile(
      profileForm.name,
      profileForm.email,
    );
    if (success_result) {
      setSuccess("Profil berhasil diperbarui");
    } else {
      setError(contextError || "Update profil gagal");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.passwordConfirmation
    ) {
      setError("Semua field harus diisi");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.passwordConfirmation) {
      setError("Password baru tidak cocok");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }

    const success_result = await updatePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword,
      passwordForm.passwordConfirmation,
    );

    if (success_result) {
      setSuccess("Password berhasil diperbarui");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        passwordConfirmation: "",
      });
    } else {
      setError(contextError || "Update password gagal");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!currentUser) {
    return (
      <>
        <PageHero title="Profil" />
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-md mx-auto text-center">
            <p className="text-gray-600 mb-4">Anda belum login</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Kembali ke Login
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title="Profil" />
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            {/* Tabs */}
            <div className="border-b flex">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-4 px-6 font-medium text-center border-b-2 transition ${
                  activeTab === "profile"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex-1 py-4 px-6 font-medium text-center border-b-2 transition ${
                  activeTab === "password"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Ubah Password
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {(error || success) && (
                <div
                  className={`mb-6 p-4 rounded border ${
                    error
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-green-50 border-green-200 text-green-700"
                  }`}
                >
                  {error || success}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h3 className="text-lg font-bold mb-6 text-gray-900">
                    Informasi Profil
                  </h3>
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                      >
                        {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <div>
                  <h3 className="text-lg font-bold mb-6 text-gray-900">
                    Ubah Password
                  </h3>
                  <form
                    onSubmit={handlePasswordSubmit}
                    className="space-y-4 max-w-md"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password Saat Ini
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password Baru
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        name="passwordConfirmation"
                        value={passwordForm.passwordConfirmation}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                      >
                        {isLoading ? "Menyimpan..." : "Ubah Password"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
