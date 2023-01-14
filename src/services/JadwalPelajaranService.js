const { print } = require("../utils/services");

// Repository
const JadwalPelajaranRepo = require("../models/repositories/JadwalPelajaranRepo");

// -----------------------------------------------------------------------------------

exports.insert = async (
  traceId,
  id_sekolah,
  { id_kelas, nama, tanggal_waktu, keterangan }
) => {
  let message = "";
  try {
    // validasi body
    if (!(id_kelas && nama && tanggal_waktu && keterangan)) {
      message = "body (id_kelas, nama, tanggal_waktu, keterangan) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isDuplicate = await JadwalPelajaranRepo.isExist({
      id_sekolah,
      id_kelas,
      nama,
    });
    if (isDuplicate) {
      message = "jadwal sudah pernah di input!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // insert
    await JadwalPelajaranRepo.insertNew({
      id_sekolah,
      id_kelas,
      nama,
      tanggal_waktu,
      keterangan,
    });

    // render
    message = "jadwal pelajaran berhasil ditambahkan!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "JadwalPelajaranService > insert",
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
      show = 10;
    }
    if (!page) {
      page = 1;
    }
    if (!keyword) {
      keyword = "";
    }

    const list = await JadwalPelajaranRepo.showPagination(show, page, keyword);

    // render
    return {
      code: 200,
      render: { list },
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "JadwalPelajaranService > showPagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

exports.edit = async (traceId, { id, id_kelas, nama, tanggal_waktu, keterangan }) => {
  let message = "";
  try {
    // validasi body
    if (!(id && id_kelas && nama && tanggal_waktu && keterangan)) {
      message = "body (id, id_kelas, nama, tanggal_waktu, keterangan) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }


    // update !!
    await JadwalPelajaranRepo.updateWhereUserId(id, {
      id_kelas,
      nama,
      tanggal_waktu,
      keterangan
    });

    // render
    message = "berhasil mengubah Jadwal Pelajaran";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "JadwalPelajaranRepo > edit", message });
    return {
      code: 500,
      message,
    };
  }
};


//hapus
exports.hapusJadwalPelajaran = async (traceId, { id }) => {
  let message = "";
  try {
    //validation
    const isIdExist = await JadwalPelajaranRepo.isIdExist(id);
    if (!isIdExist) {
      message = "id jadwal pelajaran tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await JadwalPelajaranRepo.deleteWhereId(id);

    //render
    message = "berhasil menghapus Jadwal Pelajaran!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "JadwalPelajaranRepo > hapusJadwalPelajaran",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};
