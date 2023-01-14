const { print } = require("../utils/services");

// Repository
const JabatanOsisRepo = require("../models/repositories/JabatanOsisRepo");

// -----------------------------------------------------------------------------------

exports.insert = async (traceId, id_sekolah, { nama }) => {
  let message = "";
  try {
    // validasi body
    if (!nama) {
      message = "body (nama) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // insert
    await JabatanOsisRepo.insertNew({
      id_sekolah,
      nama,
    });

    //render
    message = "jabatan osis berhasil ditambahkan";
    print(traceId, { message });
    return {
      code: 202,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "JabatanOsisService > insert", message });
    return {
      code: 500,
      message,
    };
  }
};

//show
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

    const list = await JabatanOsisRepo.showPagination(show, page, keyword);

    // render
    return {
      code: 200,
      render: { list },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "JabatanOsisService > showPagination", message });
    return {
      code: 500,
      message,
    };
  }
};

// // update
// exports.editItemFasilitas = async (
//   traceId,
//   { nama, kategori, barang, jumlah, keterangan }
// ) => {
//   let message = "";
//   try {
//     // validasi body
//     if (!(nama && kategori && barang && jumlah && keterangan)) {
//       message = "body (nama, kategori, barang, jumlah, keterangan) require!";
//       print(traceId, { message });
//       return {
//         code: 400,
//         message,
//       };
//     }

//     // update !!
//     await ItemFasilitas.updateWhereInventasisId(id, {
//       nama,
//       kategori,
//       barang,
//       jumlah,
//       keterangan,
//     });

//     // render
//     message = "Data Berhasil Diperbarui";
//     print(traceId, { message });
//     return {
//       code: 200,
//       message,
//     };
//   } catch (error) {
//     message = error.message;
//     print(traceId, { error: "ItemFasilitas > editItemFasilitas", message });
//     return {
//       code: 500,
//       message,
//     };
//   }
// };

// delete !!
exports.hapusJabatanOsis = async (traceId, { nama }) => {
  let message = "";
  try {

    //validation
    const isNamaExist = await JabatanOsisRepo.isNamaExist(nama);
    if (!isNamaExist) {
      message = "jabatan tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    //delete !!
    await JabatanOsisRepo.deleteWhereNama(nama);

    //render
    message = "berhasil menghapus jabatan osis!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "JabatanOsisService > hapusJabatanOsis", message });
    return {
      code: 500,
      message,
    };
  }
};