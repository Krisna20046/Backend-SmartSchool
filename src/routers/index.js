module.exports = (app) => {
  // ----------------------

  // Auth
  app.use(require("./AuthRouter"));
  app.use(require("./TokenRouter"));

  // User
  app.use(require("./UserRouter"));

  // ----------------------
  // Fitur Utama

  //-> Sprint 1
  app.use(require("./SiswaBaruRouter")); // + Mutasi Siswa (1 endpoint)
  app.use(require("./BlogRouter"));
  app.use(require("./BlogNewRouter"));
  app.use(require("./KartuPelajarDigitalRouter"));

  //-> Sprint 2
  app.use(require("./AbsenMuridRouter"));
  app.use(require("./NilaiSiswaRouter"));
  app.use(require("./NilaiSiswaKRouter"));
  app.use(require("./AbsenPegawaiRouter"));
  //-> Sprint 3
  app.use(require("./EkstrakurikulerRouter"));
  //-> Sprint 4

  //-> Gercep
  app.use(require("./AbsenEkstrakurikulerRouter"));
  app.use(require("./AbsenOsisRouter"));
  app.use(require("./AnggotaOsisRouter"));
  app.use(require("./BarangKoperasiRouter"));
  app.use(require("./ItemFasilitasRouter"));
  app.use(require("./JabatanOsisRouter"));
  app.use(require("./JabatanSekolahRouter"));
  app.use(require("./JadwalPelajaranRouter"));
  app.use(require("./JadwalTambahanRouter"));
  app.use(require("./KelasRouter"));
  app.use(require("./KeuanganKeluarRouter"));
  app.use(require("./KeuanganMasukRouter"));
  app.use(require("./KoperasiKeuanganKeluarRouter"));
  app.use(require("./PembelianRouter"));
  app.use(require("./PeminjamanFasilitasRouter"));
  app.use(require("./PerpustakaanBukuRouter"));
  app.use(require("./PerpustakaanPeminjamanRouter"));
  app.use(require("./SppRouter"));
  app.use(require("./TabunganMasukSiswaRouter"));
  app.use(require("./TabunganKeluarSiswaRouter"));
  app.use(require("./BlogOsisRouter"));
  app.use(require("./JadwalKegiatanOsisRouter"));
  // ----------------------

  // DEBUG
  app.use(require("./HelpCompact"));

  // ----------------------
  //-> Management

  // Uploader
  app.use(require("./UploaderCompact"));

  // APK
  app.use(require("./ApkRouter"));

  // ----------------------
};
