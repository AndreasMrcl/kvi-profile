import { useEffect, useState } from "react";

const BASE = "https://www.emsifa.com/api-wilayah-indonesia/api";

const cache = {
  provinces: null,
  regencies: new Map(),
  districts: new Map(),
};

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Gagal memuat ${url}`);
  return res.json();
}

export function useProvinces() {
  const [data, setData] = useState(cache.provinces || []);
  const [loading, setLoading] = useState(!cache.provinces);

  useEffect(() => {
    if (cache.provinces) return;
    let cancelled = false;
    setLoading(true);
    fetchJson(`${BASE}/provinces.json`)
      .then((list) => {
        cache.provinces = list;
        if (!cancelled) setData(list);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { provinces: data, loading };
}

export function useRegencies(provinceCode) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!provinceCode) {
      setData([]);
      return;
    }
    if (cache.regencies.has(provinceCode)) {
      setData(cache.regencies.get(provinceCode));
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchJson(`${BASE}/regencies/${provinceCode}.json`)
      .then((list) => {
        cache.regencies.set(provinceCode, list);
        if (!cancelled) setData(list);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [provinceCode]);

  return { regencies: data, loading };
}

export function useDistricts(regencyCode) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!regencyCode) {
      setData([]);
      return;
    }
    if (cache.districts.has(regencyCode)) {
      setData(cache.districts.get(regencyCode));
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchJson(`${BASE}/districts/${regencyCode}.json`)
      .then((list) => {
        cache.districts.set(regencyCode, list);
        if (!cancelled) setData(list);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [regencyCode]);

  return { districts: data, loading };
}
