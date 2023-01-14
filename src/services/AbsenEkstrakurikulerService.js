const { print } = require("../utils/services");

const date = require("../helpers/date");

// Repository
const AbsenEkstrakurikulerRepo = require("../models/repositories/AbsenEkstrakurikulerRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");
const EkstrakurikulerRepo = require("../models/repositories/EkstrakurikulerRepo");

// -----------------------------------------------------------------------------------

exports.signHadir = async (
  traceId,
  id_sekolah,
  id_user,
  { id_ekstra, foto, lon, lat }
) => {
  let message = "";
  try {
    if (!(id_ekstra && foto && lon && lat)) {
      message = "body (id_ekstra, foto, lon, lat) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isEkstraExist = await EkstrakurikulerRepo.isIdExist(id_ekstra);
    if (!isEkstraExist) {
      message = "id ekstra tidak ditemukan!";
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

    const isAbsenOnlyOne = await AbsenEkstrakurikulerRepo.isExist({
      id_sekolah,
      id_siswa: id_user,
      id_ekstra,
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

    await AbsenEkstrakurikulerRepo.insertNew({
      id_sekolah,
      id_siswa: id_user,
      id_ekstra,
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
      error: "AbsenEkstrakurikulerService > signHadir",
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
  { id_ekstra, reason }
) => {
  let message = "";
  try {
    if (!(id_ekstra && reason)) {
      message = "body (id_ekstra, reason) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isEkstraExist = await EkstrakurikulerRepo.isIdExist(id_ekstra);
    if (!isEkstraExist) {
      message = "id ekstra tidak ditemukan!";
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

    const isAbsenOnlyOne = await AbsenEkstrakurikulerRepo.isExist({
      id_sekolah,
      id_siswa: id_user,
      id_ekstra,
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

    await AbsenEkstrakurikulerRepo.insertNew({
      id_sekolah,
      id_siswa: id_user,
      id_ekstra,
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
      error: "AbsenEkstrakurikulerService > signTidakHadir",
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
    const result = await AbsenEkstrakurikulerRepo.showPagination(show, page);
    const sekolah_ids = result.data.map((v) => v.id_sekolah);
    const siswa_ids = result.data.map((v) => v.id_siswa);
    const ekstra_ids = result.data.map((v) => v.id_ekstra);

    // Detailing

    const list_sekolah = await SekolahRepo.collectByIds(sekolah_ids);
    const list_siswa = await UsersRepo.collectByIds(siswa_ids);
    const list_ekstra = await EkstrakurikulerRepo.collectByIds(ekstra_ids);
    result.data = result.data.map((v) => {
      v.sekolah = list_sekolah.filter((u) => u.id === v.id_sekolah)[0];
      v.siswa = list_siswa.filter((u) => u.id === v.id_siswa)[0];
      v.ekstra = list_ekstra.filter((u) => u.id === v.id_ekstra)[0];
      delete v.id_sekolah;
      delete v.id_siswa;
      delete v.id_ekstra;
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
