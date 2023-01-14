const { print } = require("../utils/services");

// Repository
const JabatanSekolahRepo = require("../models/repositories/JabatanSekolahRepo");

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
    await JabatanSekolahRepo.insertNew({
      id_sekolah,
      nama,
    });

    //render
    message = "jabatan sekolah berhasil ditambahkan";
    print(traceId, { message });
    return {
      code: 202,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "JabatanSekolahService > insert", message });
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

    const list = await JabatanSekolahRepo.showPagination(show, page, keyword);

    // render
    return {
      code: 200,
      render: { list },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "JabatanSekolahService > showPagination", message });
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
exports.hapusJabatanSekolah = async (traceId, { nama }) => {
  let message = "";
  try {

    //validation
    const isNamaExist = await JabatanSekolahRepo.isNamaExist(nama);
    if (!isNamaExist) {
      message = "jabatan tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    //delete !!
    await JabatanSekolahRepo.deleteWhereNama(nama);

    //render
    message = "berhasil menghapus jabatan sekolah!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "JabatanSekolahService > hapusJabatanSekolah", message });
    return {
      code: 500,
      message,
    };
  }
};