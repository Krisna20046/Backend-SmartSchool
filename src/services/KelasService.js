const { print } = require("../utils/services");

const { } = require("../consts");

// Repository
const KelasRepo = require("../models/repositories/KelasRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.insert = async (traceId, id_sekolah, { id_wali_kelas, nama }) => {
  let message = "";
  try {
    if (!(id_wali_kelas && nama)) {
      message = "body (id_wali_kelas, nama) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await KelasRepo.insertNew({
      id_sekolah,
      id_wali_kelas,

      nama,
    });

    // render
    message = "berhasil menambahkan kelas!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "KelasService > tambahBarang",
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
    const result = await KelasRepo.showPagination(show, page);
    const sekolah_ids = result.data.map((v) => v.id_sekolah);

    // Detailing

    const list_sekolah = await SekolahRepo.collectByIds(sekolah_ids);
    result.data = result.data.map((v) => {
      v.sekolah = list_sekolah.filter((u) => u.id === v.id_sekolah)[0];
      delete v.id_sekolah;
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
      error: "KelasService > pagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

//edit
exports.update = async (
  traceId,
  { id, id_wali_kelas, nama }
) => {
  try {
    if (!id) {
      message = "body (id) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    if (!
      (id &&
        id_wali_kelas &&
        nama
      )
    ) {
      message = "body (id, id_wali_kelas, nama) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isExist = await KelasRepo.isExist({
      id,
    });
    if (!isExist) {
      message = "id kelas tidak tersedia!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await KelasRepo.updateWhereId(id, {
      id_wali_kelas,
      nama
    });

    //render
    message = "berhasil mengubah kelas!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "KelasService > update",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};


//hapus
exports.hapusKelas = async (traceId, { id }) => {
  let message = "";
  try {

    //validation
    const isIdExist = await KelasRepo.isIdExist(id);
    if (!isIdExist) {
      message = "id kelas tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete !!
    await KelasRepo.deleteWhereId(id);

    // render
    message = "berhasil menghapus Kelas!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "KelasService > hapusKelas", message });
    return {
      code: 500,
      message,
    };
  }
};
