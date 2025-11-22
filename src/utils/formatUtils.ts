export const formatAlamat = (
  data: any,
  type: "pemohon" | "pemilik" | "bangunan"
) => {
  const baseAddress =
    type === "bangunan"
      ? data.alamat_bangunan
      : type === "pemohon"
        ? data.alamat_pemohon
        : data.alamat_pemilik;

  const rt =
    type === "bangunan"
      ? data.rt_lokasi
      : type === "pemohon"
        ? data.rt_lokasi_pemohon
        : data.rt_lokasi_pemilik;
  const rw =
    type === "bangunan"
      ? data.rw_lokasi
      : type === "pemohon"
        ? data.rw_lokasi_pemohon
        : data.rw_lokasi_pemilik;
  const noLokasi =
    type === "bangunan"
      ? data.no_lokasi
      : type === "pemohon"
        ? data.no_lokasi_pemohon
        : data.no_lokasi_pemilik;

  return `${baseAddress}, RT ${rt}/RW ${rw}${noLokasi ? `, No. ${noLokasi}` : ""}`;
};
