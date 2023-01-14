const { print } = require("../utils/services");
const { status_approve } = require("../consts");

// Repository
const JadwalTambahan = require("../models/repositories/JadwalTambahanRepo");
const KelasRepo = require("../models/repositories/KelasRepo");

// -----------------------------------------------------------------------------------

exports.insert = async (
  traceId,
  id_sekolah,
  { id_kelas, mapel, guru, hari, jam }
) => {
  let message = "";
  try {
    // validasi body
    if (!(id_kelas && mapel && guru && hari && jam)) {
      message = "body (id_kelas, mapel, guru, hari, jam) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // insert
    await JadwalTambahan.insertNew({
      id_sekolah,
      id_kelas,
      mapel,
      guru,
      hari,
      jam,
      status: status_approve.waiting
    });

    // render
    message = "jadwal tambahan berhasil ditambahkan!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "JadwalTambahan > insert",
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

    const list = await JadwalTambahan.showPagination(show, page, keyword);
    const kelas_ids = list.data.map((v) => v.id_kelas);

    // Detailing

    const list_kelas = await KelasRepo.collectByIds(kelas_ids);
    list.data = list.data.map((v) => {
      v.kelas = list_kelas.filter((u) => u.id === v.id_kelas)[0];
      delete v.id_kelas;
      return v;
    });

    // render
    return {
      code: 200,
      render: { list },
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "JadwalTambahan > showPagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

exports.edit = async (traceId, { id, status }) => {
  let message = "";
  try {
    // validasi body
    if (!(id && status)) {
      message = "body (id, status) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }


    // update !!
    await JadwalTambahan.updateWhereUserId(id, {
      status
    });

    // render
    message = "berhasil mengubah Jadwal Tambahan";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "JadwalTambahan > edit", message });
    return {
      code: 500,
      message,
    };
  }
};


//hapus
exports.hapus = async (traceId, { id }) => {
  let message = "";
  try {
    //validation
    const isIdExist = await JadwalTambahan.isIdExist(id);
    if (!isIdExist) {
      message = "id jadwal tambahan tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await JadwalTambahan.deleteWhereId(id);

    //render
    message = "berhasil menghapus Jadwal Tambahan!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "JadwalTambahan > hapus",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};
