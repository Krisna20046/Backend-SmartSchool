const { print } = require("../utils/services");

const { } = require("../consts");

// Repository
const BarangKoperasiRepo = require("../models/repositories/BarangKoperasiRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.tambahBarang = async (
  traceId,
  id_sekolah,
  { nama, kategori, harga, jumlah }
) => {
  let message = "";
  try {
    if (!(nama && kategori && harga && jumlah)) {
      message = "body (nama, kategori, harga, jumlah) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await BarangKoperasiRepo.insertNew({
      id_sekolah,
      nama,
      kategori,
      harga,
      jumlah,
    });

    // render
    message = "berhasil menambahkan barang di koperasi!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "BarangKoperasiService > tambahBarang",
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
    const result = await BarangKoperasiRepo.showPagination(show, page);
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
      error: "BarangKoperasiService > pagination",
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
  id_sekolah,
  { id, nama, kategori, harga, jumlah }
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

    if (!(nama || kategori || harga || jumlah)) {
      message = "body (nama / kategori / harga / jumlah) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isExist = await BarangKoperasiRepo.isExist({
      id_sekolah,
      id,
    });
    if (!isExist) {
      message = "id barang tidak tersedia!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await BarangKoperasiRepo.updateWhereId(id, {
      nama,
      kategori,
      harga,
      jumlah,
    });

    // render
    message = "berhasil mengubah barang di koperasi!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "BarangKoperasiService > update",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

//hapus
exports.hapusBarangKoperasi = async (traceId, { nama }) => {
  let message = "";
  try {

    //validation
    const isNamaExist = await BarangKoperasiRepo.isNamaExist(nama);
    if (!isNamaExist) {
      message = "barang tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete !!
    await BarangKoperasiRepo.deleteWhereNama(nama);

    // render
    message = "berhasil menghapus Barang koperasi!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "BarangKoperasiService > hapusBarangKoperasi",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};
