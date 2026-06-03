import { useProvinces, useRegencies, useDistricts } from "../hooks/useWilayah";

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed";

export default function RegionPicker({ value, onChange, disabled = false, required = true }) {
  const { provinces, loading: loadingProvinces } = useProvinces();
  const { regencies, loading: loadingRegencies } = useRegencies(value.province_code);
  const { districts, loading: loadingDistricts } = useDistricts(value.regency_code);

  const handleProvince = (e) => {
    const code = e.target.value;
    const name = provinces.find((p) => p.id === code)?.name || "";
    onChange({
      province_code: code,
      province_name: name,
      regency_code: "",
      regency_name: "",
      district_code: "",
      district_name: "",
    });
  };

  const handleRegency = (e) => {
    const code = e.target.value;
    const name = regencies.find((r) => r.id === code)?.name || "";
    onChange({
      ...value,
      regency_code: code,
      regency_name: name,
      district_code: "",
      district_name: "",
    });
  };

  const handleDistrict = (e) => {
    const code = e.target.value;
    const name = districts.find((d) => d.id === code)?.name || "";
    onChange({
      ...value,
      district_code: code,
      district_name: name,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Provinsi {required && <span className="text-red-500">*</span>}
        </label>
        <select
          value={value.province_code || ""}
          onChange={handleProvince}
          disabled={disabled || loadingProvinces}
          required={required}
          className={inputClass}
        >
          <option value="">
            {loadingProvinces ? "Memuat..." : "-- Pilih Provinsi --"}
          </option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kota / Kabupaten {required && <span className="text-red-500">*</span>}
        </label>
        <select
          value={value.regency_code || ""}
          onChange={handleRegency}
          disabled={disabled || !value.province_code || loadingRegencies}
          required={required}
          className={inputClass}
        >
          <option value="">
            {!value.province_code
              ? "Pilih provinsi dulu"
              : loadingRegencies
                ? "Memuat..."
                : "-- Pilih Kota/Kabupaten --"}
          </option>
          {regencies.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kecamatan {required && <span className="text-red-500">*</span>}
        </label>
        <select
          value={value.district_code || ""}
          onChange={handleDistrict}
          disabled={disabled || !value.regency_code || loadingDistricts}
          required={required}
          className={inputClass}
        >
          <option value="">
            {!value.regency_code
              ? "Pilih kota/kabupaten dulu"
              : loadingDistricts
                ? "Memuat..."
                : "-- Pilih Kecamatan --"}
          </option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
