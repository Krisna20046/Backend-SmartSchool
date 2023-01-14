const { print } = require("../utils/services");

const {} = require("../consts");

// Repository
const SppRepo = require("../models/repositories/SppRepo");
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

    await SppRepo.insertNew({
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
    const result = await SppRepo.showPagination(show, page);
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

//     const isExist = await SppRepo.isExist({
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

//     await SppRepo.updateWhereId(id, {
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
