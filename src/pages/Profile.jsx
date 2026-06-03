import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageHero from "../components/PageHero";
import RegionPicker from "../components/RegionPicker";

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed";

const STATUS_META = {
  awaiting_diploma: {
    label: "Menunggu Input Ijazah",
    badge: "bg-amber-100 text-amber-800 border border-amber-200",
  },
  pending_verification: {
    label: "Menunggu Verifikasi Admin",
    badge: "bg-blue-100 text-blue-800 border border-blue-200",
  },
  active: {
    label: "Anggota Aktif",
    badge: "bg-green-100 text-green-800 border border-green-200",
  },
  suspended: {
    label: "Suspended",
    badge: "bg-orange-100 text-orange-800 border border-orange-200",
  },
  rejected: {
    label: "Ditolak",
    badge: "bg-red-100 text-red-800 border border-red-200",
  },
  expired: {
    label: "Expired",
    badge: "bg-gray-200 text-gray-700 border border-gray-300",
  },
};

function StatusBanner({ status, deadlineAt, notes }) {
  if (status === "awaiting_diploma" && deadlineAt) {
    const deadline = new Date(deadlineAt);
    const now = new Date();
    const daysLeft = Math.max(
      0,
      Math.ceil((deadline - now) / (1000 * 60 * 60 * 24)),
    );
    return (
      <div className="mb-6 p-4 rounded-lg border bg-amber-50 border-amber-200 text-amber-800">
        <p className="font-bold mb-1">Lengkapi Nomor Ijazah Anda</p>
        <p className="text-sm">
          Pendaftaran Anda akan otomatis <strong>expired dalam {daysLeft} hari</strong>{" "}
          (deadline: {deadline.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}).
          Isi nomor ijazah di bawah agar dapat diverifikasi oleh tim KVI.
        </p>
      </div>
    );
  }

  if (status === "pending_verification") {
    return (
      <div className="mb-6 p-4 rounded-lg border bg-blue-50 border-blue-200 text-blue-800">
        <p className="font-bold mb-1">Menunggu Verifikasi Admin</p>
        <p className="text-sm">
          Nomor ijazah Anda sudah masuk antrian verifikasi. Anda akan mendapat nomor anggota
          resmi (KVI-XX-#####) setelah disahkan oleh tim KVI.
        </p>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="mb-6 p-4 rounded-lg border bg-gray-100 border-gray-300 text-gray-800">
        <p className="font-bold mb-1">Pendaftaran Expired</p>
        <p className="text-sm">
          Pendaftaran Anda expired karena nomor ijazah tidak dilengkapi tepat waktu.
          Isi nomor ijazah di bawah untuk mengajukan kembali verifikasi.
        </p>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="mb-6 p-4 rounded-lg border bg-red-50 border-red-200 text-red-800">
        <p className="font-bold mb-1">Keanggotaan Ditolak</p>
        {notes ? (
          <p className="text-sm"><strong>Alasan:</strong> {notes}</p>
        ) : (
          <p className="text-sm">Silakan hubungi admin KVI untuk informasi lebih lanjut.</p>
        )}
      </div>
    );
  }

  if (status === "suspended") {
    return (
      <div className="mb-6 p-4 rounded-lg border bg-orange-50 border-orange-200 text-orange-800">
        <p className="font-bold mb-1">Keanggotaan Disuspend</p>
        {notes && <p className="text-sm"><strong>Alasan:</strong> {notes}</p>}
      </div>
    );
  }

  return null;
}

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
    category: currentUser?.category || "",
    birth_place: currentUser?.birth_place || "",
    birth_date: currentUser?.birth_date || "",
    occupation: currentUser?.occupation || "",
    phone: currentUser?.phone || "",
    university: currentUser?.university || "",
    graduation_year: currentUser?.graduation_year || "",
    diploma_number: currentUser?.diploma_number || "",
    province_code: currentUser?.province_code || "",
    province_name: currentUser?.province_name || "",
    regency_code: currentUser?.regency_code || "",
    regency_name: currentUser?.regency_name || "",
    district_code: currentUser?.district_code || "",
    district_name: currentUser?.district_name || "",
    postal_code: currentUser?.postal_code || "",
    address: currentUser?.address || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  });

  const status = currentUser?.membership_status || "awaiting_diploma";
  const statusMeta = STATUS_META[status] || STATUS_META.awaiting_diploma;
  const membershipNumber = currentUser?.membership_number;
  const diplomaChanged =
    profileForm.diploma_number !== (currentUser?.diploma_number || "");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegionChange = (region) => {
    setProfileForm((prev) => ({ ...prev, ...region }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!profileForm.name || !profileForm.email) {
      setError("Nama dan Email wajib diisi");
      return;
    }

    const result = await updateProfile(profileForm);

    if (result) {
      if (diplomaChanged && profileForm.diploma_number) {
        setSuccess(
          "Profil berhasil diperbarui. Nomor ijazah baru masuk antrian verifikasi admin.",
        );
      } else {
        setSuccess("Profil berhasil diperbarui");
      }
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

    const result = await updatePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword,
      passwordForm.passwordConfirmation,
    );

    if (result) {
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
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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

              {activeTab === "profile" && (
                <div>
                  <StatusBanner
                    status={status}
                    deadlineAt={currentUser?.diploma_deadline_at}
                    notes={currentUser?.verification_notes}
                  />

                  <div className="flex justify-between items-start mb-6 flex-wrap gap-3 p-4 bg-gray-50 border rounded-lg">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                        Nomor Anggota
                      </p>
                      <p className="text-2xl font-bold text-kvi-700">
                        {membershipNumber || (
                          <span className="text-gray-400 text-lg font-normal">
                            Belum diterbitkan
                          </span>
                        )}
                      </p>
                      {currentUser?.joined_at && (
                        <p className="text-xs text-gray-500 mt-1">
                          Disahkan{" "}
                          {new Date(currentUser.joined_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1.5 text-xs font-bold rounded-full uppercase ${statusMeta.badge}`}
                    >
                      {statusMeta.label}
                    </span>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-8">
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                        Data Diri
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kategori
                          </label>
                          <select
                            name="category"
                            value={profileForm.category}
                            onChange={handleProfileChange}
                            disabled={isLoading || status === "active"}
                            className={inputClass}
                          >
                            <option value="">-- Pilih Kategori --</option>
                            <option value="dokter_hewan">Dokter Hewan</option>
                            <option value="paramedis_veteriner">Paramedis Veteriner</option>
                          </select>
                          {status === "active" && (
                            <p className="mt-1 text-xs text-gray-500">
                              Kategori dikunci setelah anggota aktif (mempengaruhi nomor anggota).
                            </p>
                          )}
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
                            className={inputClass}
                          />
                        </div>
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
                            className={inputClass}
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
                              className={inputClass}
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
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pekerjaan / Posisi
                          </label>
                          <input
                            type="text"
                            name="occupation"
                            value={profileForm.occupation}
                            onChange={handleProfileChange}
                            disabled={isLoading}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                        Pendidikan & Verifikasi
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className={inputClass}
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
                            className={inputClass}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nomor Ijazah
                          </label>
                          <input
                            type="text"
                            name="diploma_number"
                            value={profileForm.diploma_number}
                            onChange={handleProfileChange}
                            disabled={isLoading || status === "active"}
                            className={inputClass}
                            placeholder="Nomor seri ijazah resmi"
                          />
                          {status === "active" ? (
                            <p className="mt-1 text-xs text-gray-500">
                              Nomor ijazah dikunci karena keanggotaan sudah aktif.
                            </p>
                          ) : diplomaChanged && profileForm.diploma_number ? (
                            <p className="mt-1 text-xs text-amber-700">
                              Setelah disimpan, nomor ijazah akan masuk antrian verifikasi admin.
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                        Alamat Domisili
                      </h4>
                      <div className="space-y-4">
                        <RegionPicker
                          value={profileForm}
                          onChange={handleRegionChange}
                          disabled={isLoading}
                          required={false}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Kode Pos
                            </label>
                            <input
                              type="text"
                              name="postal_code"
                              value={profileForm.postal_code}
                              onChange={handleProfileChange}
                              disabled={isLoading}
                              className={inputClass}
                              maxLength={10}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Alamat Lengkap (Jalan, RT/RW)
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={profileForm.address}
                              onChange={handleProfileChange}
                              disabled={isLoading}
                              className={inputClass}
                            />
                          </div>
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
                        className={inputClass}
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
                        className={inputClass}
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
                        className={inputClass}
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
