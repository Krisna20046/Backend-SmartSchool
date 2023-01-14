const { print } = require("../utils/services");

const { role_user } = require("../consts");

// Repository
const Ekstrakurikuler = require("../models/repositories/EkstrakurikulerRepo");
const PembinaEkstrakurikuler = require("../models/repositories/PembinaEkstrakurikulerRepo");
const AbsenEkstrakurikuler = require("../models/repositories/AbsenEkstrakurikulerRepo");
const Users = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.tambahEkstrakurikuler = async (
  traceId,
  id_sekolah,
  { id_pembina, nama, hari, jam, image }
) => {
  let message = "";
  try {
    // validasi body
    if (!(id_pembina && nama && hari && jam && image)) {
      message = "body (id_pembina, nama, hari, jam, image) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isPembinaExist = await Users.isIdExist(id_pembina);
    if (!isPembinaExist) {
      message = "id pembina tidak tersedia!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // insert baru
    const id_ekstra = await Ekstrakurikuler.insertNew({
      id_sekolah,
      nama,
      hari,
      jam,
      image,
    });
    await PembinaEkstrakurikuler.insertNew({
      id_sekolah,
      id_pembina,
      id_ekstra,
    });

    // render
    message = "anda berhasil menambah ekstrakurikuler";
    print(traceId, { message });
    return {
      code: 202,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "EkstrakurikulerService > tambahEkstrakurikuler",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

//--------------Read--------------
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

    const list = await Ekstrakurikuler.showPagination(show, page, keyword);

    // render
    return {
      code: 200,
      render: { list },
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "EkstrakurikulerService > showPagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

// --------------Update--------------
exports.updateEkstrakurikuler = async (
  traceId,
  { id,
    id_pembina,
    nama,
    hari,
    jam,
    image }) => {
  let message = "";
  try {
    // validasi body
    if (!
      (id &&
        id_pembina &&
        nama &&
        hari &&
        jam &&
        image)) {
      message = "body (id, id_pembina, nama, hari, jam, image) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update !!
    await Ekstrakurikuler.updateWhereUserId(id, {
      nama,
      hari,
      jam,
      image,
    });
    await PembinaEkstrakurikuler.updateWhereUserId(id, {
      id_pembina,
    })

    // render
    message = "berhasil mengubah ekstrakurikuler!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "EkstrakurikulerService > updateEkstrakurikuler",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

// --------------Delete--------------
exports.hapusEkstrakurikuler = async (traceId, { id }) => {
  let message = "";
  try {
    // delete !!
    await Ekstrakurikuler.deleteWhereId(id);

    // render
    message = "berhasil menghapus Ekstrakurikuler!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "EkstrakurikulerService > hapusEkstrakurikuler",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};
