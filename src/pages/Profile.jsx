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

  // State diperbarui dengan memasukkan data keanggotaan
  const [profileForm, setProfileForm] = useState({
    registration_number: currentUser?.registration_number || "",
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    birth_place: currentUser?.birth_place || "", // Ubah ini
    birth_date: currentUser?.birth_date || "", // Ubah ini
    address: currentUser?.address || "",
    occupation: currentUser?.occupation || "",
    phone: currentUser?.phone || "",
    university: currentUser?.university || "",
    graduation_year: currentUser?.graduation_year || "",
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
      setError("Nama dan Email wajib diisi");
      return;
    }

    // Kita kirim seluruh objek profileForm ke backend
    const success_result = await updateProfile(profileForm);

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
      setError("Semua field password harus diisi");
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
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b flex bg-white">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-4 px-6 font-medium text-center border-b-2 transition ${
                  activeTab === "profile"
                    ? "border-blue-600 text-blue-600 bg-blue-50/50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Informasi & Data Diri
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex-1 py-4 px-6 font-medium text-center border-b-2 transition ${
                  activeTab === "password"
                    ? "border-blue-600 text-blue-600 bg-blue-50/50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Keamanan Password
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {(error || success) && (
                <div
                  className={`mb-6 p-4 rounded-lg border ${
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
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      Edit Data Keanggotaan
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase">
                      Anggota Aktif
                    </span>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Kolom Kiri */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nomor Pendaftaran
                          </label>
                          <p className="text-xl font-bold text-kvi-700 mt-1">
                            {profileForm?.registration_number
                              ? String(
                                  profileForm.registration_number,
                                ).padStart(5, "0")
                              : "Belum Ada"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Lengkap
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                            required
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
                            required
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tempat Lahir
                            </label>
                            <input
                              type="text"
                              name="birth_place"
                              value={profileForm.birth_place}
                              onChange={handleProfileChange}
                              disabled={isLoading}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tanggal Lahir
                            </label>
                            <input
                              type="date"
                              name="birth_date"
                              value={profileForm.birth_date}
                              onChange={handleProfileChange}
                              disabled={isLoading}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pekerjaan
                          </label>
                          <input
                            type="text"
                            name="occupation"
                            value={profileForm.occupation}
                            onChange={handleProfileChange}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Kolom Kanan */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            No. Telpon / HP
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lulusan Universitas
                          </label>
                          <input
                            type="text"
                            name="university"
                            value={profileForm.university}
                            onChange={handleProfileChange}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tahun Kelulusan
                          </label>
                          <input
                            type="text"
                            name="graduation_year"
                            value={profileForm.graduation_year}
                            onChange={handleProfileChange}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Alamat Rumah
                          </label>
                          <textarea
                            name="address"
                            value={profileForm.address}
                            onChange={handleProfileChange}
                            disabled={isLoading}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t mt-6">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                      >
                        {isLoading ? "Menyimpan..." : "Simpan Perubahan Data"}
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
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
                  <h3 className="text-xl font-bold mb-6 text-gray-900">
                    Ubah Password Akun
                  </h3>
                  <form
                    onSubmit={handlePasswordSubmit}
                    className="space-y-5 max-w-md"
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
                    <div className="pt-4 border-t mt-6">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                      >
                        {isLoading ? "Menyimpan..." : "Update Password"}
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
