const { print } = require("../utils/services");

const { } = require("../consts");

// Repository
const KeuanganMasuk = require("../models/repositories/KeuanganMasukRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.insert = async (
  traceId,
  id_sekolah,
  { jenis_dana, tanggal_waktu, nominal }
) => {
  let message = "";
  try {
    if (!(jenis_dana && tanggal_waktu && nominal)) {
      message =
        "body (jenis_dana, tanggal_waktu, nominal) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await KeuanganMasuk.insertNew({
      id_sekolah,

      jenis_dana,
      tanggal_waktu,
      nominal,
    });

    // render
    message = "berhasil menambah dana!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "KeuanganMasuk > insert",
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
    const result = await KeuanganMasuk.showPagination(show, page);
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
      error: "KeuanganMasuk > pagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

exports.update = async (
  traceId,
  { id, jenis_dana, tanggal_waktu, nominal }
) => {
  let message = "";
  try {
    //validasi body
    if (!(jenis_dana && tanggal_waktu && nominal)) {
      message = "body (id, jenis_dana, tanggal_waktu, nominal) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update !!
    await KeuanganMasuk.updateWhereId(id, {
      jenis_dana,
      tanggal_waktu,
      nominal,
    });

    // render
    message = "Data Berhasil Diperbarui";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "KeuanganMasuk > update", message });
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
    const isIdExist = await KeuanganMasuk.isIdExist(id);
    if (!isIdExist) {
      message = "Data Keuangan Masuk Tidak Tersedia";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete !!
    await KeuanganMasuk.deleteWhereId(id);

    // render
    message = "berhasil menghapus Data Keuangan Masuk!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "KeuanganMasuk > hapus", message });
    return {
      code: 500,
      message,
    };
  }
};
