const { print } = require("../utils/services");

const {} = require("../consts");

// Repository
const PembelianRepo = require("../models/repositories/PembelianRepo");
const HistoryPembelianRepo = require("../models/repositories/HistoryPembelianRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");
const { isArray } = require("../helpers/validation");

// -----------------------------------------------------------------------------------

exports.insert = async (
  traceId,
  id_sekolah,
  { nama_pembeli, tanggal_waktu, list_barang, is_lunas }
) => {
  let message = "";
  try {
    if (!(nama_pembeli && tanggal_waktu && list_barang)) {
      message = "body (nama_pembeli, tanggal_waktu, list_barang) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    if (!isArray(list_barang)) {
      message = "list_barang harus array!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }
    list_barang = list_barang.filter((v) => v.nama_barang && v.quantity);

    const id_pembelian = await PembelianRepo.insertNew({
      id_sekolah,

      nama_pembeli,
      tanggal_waktu,
      is_lunas,
    });
    await HistoryPembelianRepo.insertNew(
      list_barang.map((v) => {
        v.id_pembelian = id_pembelian;
        return v;
      })
    );

    // render
    message = "berhasil melakukan pembelian!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "PembelianService > insert",
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
    const result = await PembelianRepo.showPagination(show, page);
    const sekolah_ids = result.data.map((v) => v.id_sekolah);
    const pembelian_ids = result.data.map((v) => v.id);

    // Detailing

    const list_sekolah = await SekolahRepo.collectByIds(sekolah_ids);
    const list_history_pembelian =
      await HistoryPembelianRepo.collectByPembelianIds(pembelian_ids);
    result.data = result.data.map((v) => {
      v.sekolah = list_sekolah.filter((u) => u.id === v.id_sekolah)[0];
      v.barang = list_history_pembelian.filter((u) => u.id_pembelian === v.id);
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
      error: "PembelianService > pagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

// exports.update = async (
//   traceId,
//   id_sekolah,
//   { id, nama, kategori, harga, jumlah }
// ) => {
//   try {
//     if (!id) {
//       message = "body (id) require!";
//       print(traceId, { message });
//       return {
//         code: 400,
//         message,
//       };
//     }

//     if (!(nama || kategori || harga || jumlah)) {
//       message = "body (nama / kategori / harga / jumlah) require!";
//       print(traceId, { message });
//       return {
//         code: 400,
//         message,
//       };
//     }

//     const isExist = await PembelianRepo.isExist({
//       id_sekolah,
//       id,
//     });
//     if (!isExist) {
//       message = "id barang tidak tersedia!";
//       print(traceId, { message });
//       return {
//         code: 400,
//         message,
//       };
//     }

//     await PembelianRepo.updateWhereId(id, {
//       nama,
//       kategori,
//       harga,
//       jumlah,
//     });

//     // render
//     message = "berhasil mengubah barang di koperasi!";
//     return {
//       code: 200,
//       message,
//     };
//   } catch (error) {
//     message = error.message;
//     print(traceId, {
//       error: "BarangKoperasiService > update",
//       message,
//     });
//     return {
//       code: 500,
//       message,
//     };
//   }
// };
