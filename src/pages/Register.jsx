import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageHero from "../components/PageHero";
import RegionPicker from "../components/RegionPicker";

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed";

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading, error: contextError } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    birth_place: "",
    birth_date: "",
    occupation: "",
    phone: "",
    email: "",
    university: "",
    graduation_year: "",
    diploma_number: "",
    province_code: "",
    province_name: "",
    regency_code: "",
    regency_name: "",
    district_code: "",
    district_name: "",
    postal_code: "",
    address: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegionChange = (region) => {
    setFormData((prev) => ({ ...prev, ...region }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = [
      "name",
      "category",
      "birth_place",
      "birth_date",
      "occupation",
      "phone",
      "email",
      "university",
      "graduation_year",
      "province_code",
      "regency_code",
      "district_code",
      "postal_code",
      "address",
      "password",
    ];
    const isAnyEmpty = requiredFields.some((field) => !formData[field]);

    if (isAnyEmpty) {
      setError("Mohon lengkapi seluruh formulir pendaftaran.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password terlalu pendek. Minimal 8 karakter.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    sessionStorage.setItem(
      "registerSuccess",
      formData.diploma_number
        ? "Pendaftaran berhasil! Nomor ijazah Anda akan diverifikasi oleh tim KVI."
        : "Pendaftaran berhasil! Silakan lengkapi nomor ijazah dalam 7 hari agar pendaftaran tidak expired.",
    );

    const success = await register(formData);

    if (success) {
      navigate("/profile");
    } else {
      sessionStorage.removeItem("registerSuccess");
      setError(contextError || "Pendaftaran gagal. Periksa kembali data Anda.");
    }
  };

  return (
    <>
      <PageHero title="Registrasi Nasional Keanggotaan KVI" />
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center border-b pb-4">
            Formulir Pendaftaran
          </h2>

          {(error || contextError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm font-medium">
              {error || contextError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bagian 1: Data Diri */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Data Diri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap beserta Gelar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={inputClass}
                    placeholder="Drh. Budi Santoso"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={inputClass}
                  >
                    <option value="">-- Pilih Kategori --</option>
                    <option value="dokter_hewan">Dokter Hewan</option>
                    <option value="paramedis_veteriner">Paramedis Veteriner</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tempat Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="birth_place"
                      value={formData.birth_place}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={inputClass}
                      placeholder="Jakarta"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pekerjaan / Posisi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={inputClass}
                    placeholder="Praktek Mandiri / Dosen / PNS"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={inputClass}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    No. Telpon / HP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={inputClass}
                    placeholder="081234567890"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 2: Pendidikan & Verifikasi */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Pendidikan & Verifikasi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lulusan Universitas <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={inputClass}
                    placeholder="Universitas Gadjah Mada"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tahun Kelulusan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="graduation_year"
                    value={formData.graduation_year}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={inputClass}
                    placeholder="2014"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Ijazah <span className="text-xs text-gray-500 font-normal">(opsional)</span>
                  </label>
                  <input
                    type="text"
                    name="diploma_number"
                    value={formData.diploma_number}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={inputClass}
                    placeholder="Nomor seri ijazah resmi"
                  />
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                    <strong>Catatan:</strong> Nomor ijazah digunakan untuk verifikasi keabsahan kelulusan oleh
                    tim KVI. Jika belum diisi saat ini, pendaftaran tetap diproses namun akan{" "}
                    <strong>otomatis expired dalam 7 hari</strong> jika nomor ijazah belum dilengkapi melalui
                    halaman profil.
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian 3: Alamat */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Alamat Domisili
              </h3>
              <div className="space-y-4">
                <RegionPicker
                  value={formData}
                  onChange={handleRegionChange}
                  disabled={isLoading}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kode Pos <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={inputClass}
                      placeholder="12520"
                      maxLength={10}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alamat Lengkap (Jalan, RT/RW) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={inputClass}
                      placeholder="Jl. Merdeka No. 1, RT 001/RW 002"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian 4: Keamanan */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Keamanan Akun
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={inputClass}
                    placeholder="Min. 8 karakter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Konfirmasi Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-1/2 mx-auto block mt-8 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
            >
              {isLoading ? "Menyimpan Data..." : "Daftar & Buat Akun"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Sudah memiliki akun?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login di sini
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
