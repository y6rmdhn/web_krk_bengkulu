// services/wilayahService.ts
import axios from "axios";

export const wilayahServices = {
  getProvinces: () =>
    axios.get(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    ),

  getRegencies: (provinceId: string) =>
    axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    ),

  getDistricts: (regencyId: string) =>
    axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`
    ),

  getVillages: (districtId: string) =>
    axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
    ),
};

// Format response untuk provinces
export const formatProvinces = (provinces: any[]) => {
  return provinces.map((province) => ({
    id: province.id,
    name: province.name,
  }));
};

// Format response untuk regencies/kota
export const formatRegencies = (regencies: any[]) => {
  return regencies.map((regency) => ({
    id: regency.id,
    name: regency.name,
    province_id: regency.province_id,
  }));
};

// Format response untuk districts/kecamatan
export const formatDistricts = (districts: any[]) => {
  return districts.map((district) => ({
    id: district.id,
    name: district.name,
    regency_id: district.regency_id,
  }));
};

// Format response untuk villages/kelurahan
export const formatVillages = (villages: any[]) => {
  return villages.map((village) => ({
    id: village.id,
    name: village.name,
    district_id: village.district_id,
  }));
};
