const { print } = require("../utils/services");

const date = require("../helpers/date");
const { status_absen } = require("../consts");

// Repository
const AbsenMuridRepo = require("../models/repositories/AbsenMuridRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.signHadir = async (
  traceId,
  id_sekolah,
  id_user,
  { foto_masuk, lon, lat }
) => {
  let message = "";
  try {
    if (!(foto_masuk && lon && lat)) {
      message = "body (foto_masuk, lon, lat) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    let now = date.now();
    now = new Date(now);

    const tanggal = now.getDate(),
      bulan = now.getMonth() + 1,
      tahun = now.getFullYear();

    const isAbsenOnlyOne = await AbsenMuridRepo.isExist({
      id_sekolah,
      id_siswa: id_user,
      tanggal,
      bulan,
      tahun,
      status: status_absen.hadir,
    });
    if (isAbsenOnlyOne) {
      message = "sudah pernah absen hadir!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await AbsenMuridRepo.insertNew({
      id_sekolah,
      id_siswa: id_user,
      tanggal,
      bulan,
      tahun,
      lon,
      lat,
      foto_masuk,
      status: status_absen.hadir,
    });

    // render
    message = "berhasil absen!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "AbsenMuridService > signHadir",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

exports.signPulang = async (
  traceId,
  id_sekolah,
  id_user,
  { foto_pulang, lon, lat }
) => {
  let message = "";
  try {
    if (!(foto_pulang && lon && lat)) {
      message = "body (foto_pulang, lon, lat) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    let now = date.now();
    now = new Date(now);

    const tanggal = now.getDate(),
      bulan = now.getMonth() + 1,
      tahun = now.getFullYear();

    const isAbsenOnlyOne = await AbsenMuridRepo.isExist({
      id_sekolah,
      id_siswa: id_user,
      tanggal,
      bulan,
      tahun,
      status: status_absen.pulang,
    });
    if (isAbsenOnlyOne) {
      message = "sudah pernah absen pulang!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await AbsenMuridRepo.insertNew({
      id_sekolah,
      id_siswa: id_user,
      tanggal,
      bulan,
      tahun,
      lon,
      lat,
      foto_pulang,
      status: status_absen.pulang,
    });

    // render
    message = "berhasil absen!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "AbsenMuridService > signPulang",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

exports.pagination = async (traceId, { show, page }) => {
  try {
    const result = await AbsenMuridRepo.showPagination(show, page);
    const sekolah_ids = result.data.map((v) => v.id_sekolah);
    const user_ids = result.data.map((v) => v.id_siswa);

    // Detailing

    const list_sekolah = await SekolahRepo.collectByIds(sekolah_ids);
    const list_user = await UsersRepo.collectByIds(user_ids);
    result.data = result.data.map((v) => {
      v.sekolah = list_sekolah.filter((u) => u.id === v.id_sekolah)[0];
      v.siswa = list_user.filter((u) => u.id === v.id_siswa)[0];
      delete v.id_sekolah;
      delete v.id_siswa;
      return v;
    });

    return {
      code: 200,
      render: {
        ...result,
      },
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "AbsenMuridService > pagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};
