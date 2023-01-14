const { print } = require("../utils/services");

const date = require("../helpers/date");

// Repository
const AbsenOsis = require("../models/repositories/AbsenOsisRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.signHadir = async (
  traceId,
  id_sekolah,
  id_user,
  { foto, lon, lat }
) => {
  let message = "";
  try {
    if (!(foto && lon && lat)) {
      message = "body ( foto, lon, lat) require!";
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

    const isAbsenOnlyOne = await AbsenOsis.isExist({
      id_sekolah,
      id_siswa: id_user,
      tanggal,
      bulan,
      tahun,
    });
    if (isAbsenOnlyOne) {
      message = "sudah pernah absen!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await AbsenOsis.insertNew({
      id_sekolah,
      id_siswa: id_user,
      tanggal,
      bulan,
      tahun,
      lon,
      lat,
      foto,
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
      error: "AbsenOsisService > signHadir",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

exports.signTidakHadir = async (
  traceId,
  id_sekolah,
  id_user,
  { reason }
) => {
  let message = "";
  try {
    if (!(reason)) {
      message = "body (reason) require!";
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

    const isAbsenOnlyOne = await AbsenOsis.isExist({
      id_sekolah,
      id_siswa: id_user,
      tanggal,
      bulan,
      tahun,
    });
    if (isAbsenOnlyOne) {
      message = "sudah pernah absen!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await AbsenOsis.insertNew({
      id_sekolah,
      id_siswa: id_user,
      tanggal,
      bulan,
      tahun,
      is_ijin: true,
      reason,
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
      error: "AbsenOsisService > signTidakHadir",
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
    const result = await AbsenOsis.showPagination(show, page);
    const sekolah_ids = result.data.map((v) => v.id_sekolah);
    const siswa_ids = result.data.map((v) => v.id_siswa);

    // Detailing

    const list_sekolah = await SekolahRepo.collectByIds(sekolah_ids);
    const list_siswa = await UsersRepo.collectByIds(siswa_ids);
    result.data = result.data.map((v) => {
      v.sekolah = list_sekolah.filter((u) => u.id === v.id_sekolah)[0];
      v.siswa = list_siswa.filter((u) => u.id === v.id_siswa)[0];
      delete v.id_sekolah;
      delete v.id_siswa;
      delete v.id_osis;
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
      error: "AbsenOsisService > pagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};
