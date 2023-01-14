const { print } = require("../utils/services");

// Repository
const JadwalKegiatanOsisRepo = require("../models/repositories/JadwalKegiatanOsisRepo");
const AnggotaOsis = require("../models/repositories/AnggotaOsisRepo");

// -----------------------------------------------------------------------------------

exports.postingJadwalKegiatanOsis = async (
  traceId,
  id_sekolah,
  { kegiatan, lokasi, tanggal_waktu }
) => {
  let message = "";
  try {
    // validasi body
    if (!(kegiatan && lokasi && tanggal_waktu)) {
      message = "body (kegiatan, lokasi, tanggal_waktu) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    //prefix
    const prefix = String(kegiatan)
      .toLowerCase()
      .replace(/[^a-z^0-9]+/g, " ") // hanya boleh huruf dan angka
      .replace(/  /g, " ")
      .replace(/  /g, " ")
      .replace(/  /g, " ")
      .replace(/ /g, "-"); // finish

    // validation
    const isPrefixExist = await JadwalKegiatanOsisRepo.isExist({
      prefix,
    });
    if (isPrefixExist) {
      message = "judul sudah ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // insert
    await JadwalKegiatanOsisRepo.insertNew({
      id_sekolah,

      prefix,
      kegiatan,
      lokasi,
      tanggal_waktu,
    });

    // render
    message = "Jadwal Kegiatan Osis berhasil disimpan!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "JadwalKegiatanOsisRepo > postingJadwalKegiatanOsis",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

//read
exports.showPagination = async (traceId, { show, page, keyword }) => {
  let message = "";
  try {
    // validasi nilai
    if (!show) {
      show = 1;
    }
    if (!page) {
      page = 1;
    }
    if (!keyword) {
      keyword = "";
    }

    const list = await JadwalKegiatanOsisRepo.showPagination(
      show,
      page,
      keyword
    );

    // render
    return {
      code: 200,
      render: { list },
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "JadwalKegiatanOsisRepo > showPagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

//update
exports.updateJadwalKegiatanOsis = async (traceId, { id, kegiatan, lokasi, tanggal_waktu }) => {
  let message = "";
  try {
    // validasi body
    if (
      !(kegiatan && lokasi && tanggal_waktu)
    ) {
      message =
        "body (id, kegiatan, lokasi, tanggal_waktu) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const prefix = String(kegiatan)
      .toLowerCase()
      .replace(/\+/, " ")
      .replace(/\&/, " ")
      .replace(/\./, "")
      .split(" ")
      .join("-");

    // validation
    const isPrefixExist = await JadwalKegiatanOsisRepo.isExist({
      prefix,
    });
    if (isPrefixExist) {
      message = "judul sudah ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    //update
    await JadwalKegiatanOsisRepo.updateWhereUserId(id, {
      prefix,
      kegiatan,
      lokasi,
      tanggal_waktu,
    });

    // render
    message = "berhasil mengubah Jadwal OSIS!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "JadwalKegiatanOsisRepo > updateJadwalKegiatanOsis",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

//hapus
exports.hapusJadwalKegiatanOsis = async (traceId, { prefix }) => {
  let message = "";
  try {

    //validation
    const isPrefixExist = await JadwalKegiatanOsisRepo.isPrefixExist(prefix);
    if (!isPrefixExist) {
      message = "prefix tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete !!
    await JadwalKegiatanOsisRepo.deleteWherePrefix(prefix);

    // render
    message = "berhasil menghapus Jadwal Kegiatan Osis!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "JadwalKegiatanOsisRepo > hapusJadwalKegiatanOsis", message });
    return {
      code: 500,
      message,
    };
  }
};
