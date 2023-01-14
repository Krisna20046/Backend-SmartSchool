const { print } = require("../utils/services");

const { } = require("../consts");

// Repository
const KoperasiKeuanganKeluarRepo = require("../models/repositories/KoperasiKeuanganKeluarRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.insert = async (
  traceId,
  id_sekolah,
  { nominal, tanggal_waktu, keterangan }
) => {
  let message = "";
  try {
    if (!(nominal && tanggal_waktu && keterangan)) {
      message = "body (nominal, tanggal_waktu, keterangan) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await KoperasiKeuanganKeluarRepo.insertNew({
      id_sekolah,

      nominal,
      tanggal_waktu,
      keterangan,
    });

    // render
    message = "berhasil mengeluarkan dana koperasi!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "KoperasiKeuanganKeluarService > insert",
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
    const result = await KoperasiKeuanganKeluarRepo.showPagination(show, page);
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
      error: "KoperasiKeuanganKeluarService > pagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

//update
exports.update = async (
  traceId,
  { id, nominal, tanggal_waktu, keterangan }
) => {
  let message = "";
  try {
    //validasi body
    if (!(nominal && tanggal_waktu && keterangan)) {
      message = "body (id, nominal, tanggal_waktu, keterangan) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update !!
    await KoperasiKeuanganKeluarRepo.updateWhereUserId(id, {
      nominal,
      tanggal_waktu,
      keterangan,
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
    print(traceId, { error: "KoperasiKeuanganKeluarService > update", message });
    return {
      code: 500,
      message,
    };
  }
};

//hapus
exports.hapusKoperasiKeuanganKeluar = async (traceId, { id }) => {
  let message = "";
  try {

    //validation
    const isIdExist = await KoperasiKeuanganKeluarRepo.isIdExist(id);
    if (!isIdExist) {
      message = "id keuangan keluar tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete !!
    await KoperasiKeuanganKeluarRepo.deleteWhereId(id);

    // render
    message = "berhasil menghapus data keuangan keluar!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "KoperasiKeuanganKeluarService > hapusKoperasiKeuanganKeluar",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};
