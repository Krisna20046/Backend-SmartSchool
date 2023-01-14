const path = require("path");

//                     hosting                 // local
exports.project_root = process.env.LSNODE_ROOT || path.join(__dirname, "..");

// Setup Environment
require("dotenv").config();
require("dotenv").config({
  path: path.join(this.project_root, `.env.${process.env.ENV}`),
});

// -------------------------------------------------------------------------------

exports.isCompiled = ["index.js", "app.js"].some((root) =>
  String(__filename).endsWith(root)
);

exports.isProduction = String(process.env.NODE_ENV).includes("production");

exports.skip_request = ["/log", "/favicon.ico", "/assets"];

// -------------------------------------------------------------------------------

exports.expired_token = process.env.EXPIRED_TOKEN
  ? parseInt(process.env.EXPIRED_TOKEN)
  : 7; // day

exports.max_file_upload_size = process.env.MAX_FILE_UPLOAD_SIZE;
exports.path_uploader = process.env.PATH_UPLOADER;

exports.debug = false; // if true ? id : false
exports.skip_otp = true;

// -------------------------------------------------------------------------------

exports.default_password = "12345678";

exports.religions = {
  islam: "islam",
  kristen: "kristen",
  katolik: "katolik",
  hindu: "hindu",
  budha: "budha",
  konghucu: "konghucu",
};
exports.jenis_kelamin = {
  L: "Laki-Laki",
  P: "Perempuan",
};
exports.status_ekskul = {
  aktif: "Aktif",
  non_aktif: "Non-Aktif",
};
exports.kategori_buku = {
  fiksi: "Fiksi",
  non_fiksi: "Non-Fiksi",
};

exports.role_user = {
  superman: "SA", //0 Super Admin
  admin: "A", //1 Admin (Sekolah)

  // Eksekutor
  kepala_sekolah: "KS", //2 Kepala Sekolah
  guru: "G", //3 Guru
  wali_kelas: "WK",
  pembina_osis: "PO",
  pembina_ekstra: "PE",

  // Pengelolaan
  tu: "TU", //4 Tata Usaha
  perpustakaan: "PP", //5 Pegawai Perpustakaan
  koperasi: "PK", //6 Pegawai Koperasi

  // Pihak Siswa/i
  wali_murid: "WS", //7 Wali Murid
  murid: "M", //8 Murid (default)
  osis: "OSIS", //9 <~

  // Aset
  kantin: "K", //10 Kantin

  // Luar Sekolah
  pengawas_sekolah: "PS", //11 Pengawas Sekolah
  dinas_pendidikan: "DP", //12 Dinas Pendidikan
};

exports.type_dokumen = {
  ijazah: "ijazah",
  sertifikat: "sertifikat",
};

exports.status_absen = {
  hadir: "hadir",
  pulang: "pulang",
};

exports.status_approve = {
  waiting: "diproses",
  ditolak: "ditolak",
  diterima: "diterima",
};
