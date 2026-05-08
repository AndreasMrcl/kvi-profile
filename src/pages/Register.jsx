import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageHero from "../components/PageHero";

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading, error: contextError } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    birth_place: "",
    birth_date: "",
    address: "",
    occupation: "",
    phone: "",
    email: "",
    university: "",
    graduation_year: "",
    password: "",
    password_confirmation: "",
  });
  
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // UX: Validasi manual memastikan semua tidak kosong
    const requiredFields = ['name', 'birth_place', 'birth_date', 'address', 'occupation', 'phone', 'email', 'university', 'graduation_year', 'password'];
    const isAnyEmpty = requiredFields.some(field => !formData[field]);
    
    if (isAnyEmpty) {
      setError("Mohon lengkapi seluruh formulir pendaftaran.");
      return;
    }

    // UX: Validasi panjang password
    if (formData.password.length < 8) {
      setError("Password terlalu pendek. Minimal 8 karakter.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    const success = await register(formData);
    
    if (success) {
      setSuccessMsg("Pendaftaran berhasil! Mengalihkan ke halaman profil...");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } else {
      setError(contextError || "Pendaftaran gagal. Periksa kembali data Anda.");
    }
  };

  return (
    <>
      <PageHero title="Registrasi Keanggotaan KVI" />
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center border-b pb-4">
            Formulir Pendaftaran
          </h2>

          {(error || contextError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm font-medium">
              {error || contextError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              
              {/* KOLOM KIRI */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap beserta Gelar <span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isLoading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Drh. Budi Santoso" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir <span className="text-red-500">*</span></label>
                    <input type="text" name="birth_place" value={formData.birth_place} onChange={handleChange} required disabled={isLoading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jakarta" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir <span className="text-red-500">*</span></label>
                    <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} required disabled={isLoading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan <span className="text-red-500">*</span></label>
                  <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} required disabled={isLoading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Dokter Hewan Praktik" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lulusan Universitas <span className="text-red-500">*</span></label>
                  <input type="text" name="university" value={formData.university} onChange={handleChange} required disabled={isLoading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Universitas Gadjah Mada" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Kelulusan <span className="text-red-500">*</span></label>
                  <input type="number" name="graduation_year" value={formData.graduation_year} onChange={handleChange} required disabled={isLoading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="2014" />
                </div>
              </div>

              {/* KOLOM KANAN */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isLoading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@example.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. Telpon / HP <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required disabled={isLoading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="081234567890" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Rumah <span className="text-red-500">*</span></label>
                  <textarea name="address" value={formData.address} onChange={handleChange} required disabled={isLoading} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jl. Merdeka No. 1..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required disabled={isLoading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Min. 8 karakter" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi <span className="text-red-500">*</span></label>
                    <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required disabled={isLoading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

            </div>

            <button type="submit" disabled={isLoading} className="w-full md:w-1/2 mx-auto block mt-8 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md">
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