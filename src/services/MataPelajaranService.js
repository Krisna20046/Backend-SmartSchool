const { print } = require("../utils/services");

const {} = require("../consts");

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

//     const isExist = await KoperasiKeuanganKeluarRepo.isExist({
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

//     await KoperasiKeuanganKeluarRepo.updateWhereId(id, {
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
