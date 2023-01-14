const { print } = require("../utils/services");

const { } = require("../consts");

// Repository
const KeuanganKeluarRepo = require("../models/repositories/KeuanganKeluarRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.insert = async (
  traceId,
  id_sekolah,
  { ambil_dana, tanggal_waktu, nominal, keterangan, img_nota }
) => {
  let message = "";
  try {
    if (!(ambil_dana && tanggal_waktu && nominal && keterangan && img_nota)) {
      message =
        "body (ambil_dana, tanggal_waktu, nominal, keterangan, img_nota) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await KeuanganKeluarRepo.insertNew({
      id_sekolah,

      ambil_dana,
      tanggal_waktu,
      nominal,
      keterangan,
      nota: img_nota,
    });

    // render
    message = "berhasil menarik dana!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "KeuanganKeluarService > insert",
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
    const result = await KeuanganKeluarRepo.showPagination(show, page);
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
      error: "KeuanganKeluarService > pagination",
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
  { id, ambil_dana, tanggal_waktu, nominal, keterangan, img_nota }
) => {
  let message = "";
  try {
    //validasi body
    if (!(ambil_dana && tanggal_waktu && nominal && keterangan && img_nota)) {
      message = "body (id, ambil_dana, tanggal_waktu, nominal, keterangan, img_nota) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update !!
    await KeuanganKeluarRepo.updateWhereId(id, {
      ambil_dana,
      tanggal_waktu,
      nominal,
      keterangan,
      nota: img_nota,
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
    print(traceId, { error: "KeuanganKeluarService > update", message });
    return {
      code: 500,
      message,
    };
  }
};

//hapus
exports.hapusKeuanganKeluar = async (traceId, { ambil_dana }) => {
  let message = "";
  try {

    //validation
    const isNamaExist = await KeuanganKeluarRepo.isNamaExist(ambil_dana);
    if (!isNamaExist) {
      message = "Data Keuangan Keluar Tidak Tersedia";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete !!
    await KeuanganKeluarRepo.deleteWhereNama(ambil_dana);

    // render
    message = "berhasil menghapus Data Keuangan Keluar!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "KeuanganKeluarRepo > hapusKeuanganKeluar", message });
    return {
      code: 500,
      message,
    };
  }
};
