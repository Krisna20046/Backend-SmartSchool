const { print } = require("../utils/services");

// Repository
const ItemFasilitasRepo = require("../models/repositories/ItemFasilitasRepo");

// -----------------------------------------------------------------------------------

exports.insert = async (
  traceId,
  id_sekolah,
  { icon, nama, kategori, jumlah, keterangan }
) => {
  let message = "";
  try {
    // validasi body
    if (!(icon && nama && kategori && jumlah && keterangan)) {
      message = "body (icon, nama, kategori, jumlah, keterangan) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // insert
    await ItemFasilitasRepo.insertNew({
      id_sekolah,

      icon,
      nama,
      kategori,
      jumlah,
      keterangan,
    });

    //render
    message = "Data Fasilitas Berhasil Ditambahkan";
    print(traceId, { message });
    return {
      code: 202,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "ItemFasilitasService > insert", message });
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

    const list = await ItemFasilitasRepo.showPagination(show, page, keyword);

    // render
    return {
      code: 200,
      render: { list },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "ItemFasilitasService > showPagination", message });
    return {
      code: 500,
      message,
    };
  }
};

// update
exports.update = async (
  traceId,
  { id, icon, nama, kategori, jumlah, keterangan }
) => {
  let message = "";
  try {
    //validasi body
    if (!(icon && nama && kategori && jumlah && keterangan)) {
      message = "body (id, icon, nama, kategori, jumlah, keterangan) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update !!
    await ItemFasilitasRepo.updateWhereUserId(id, {
      icon,
      nama,
      kategori,
      jumlah,
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
    print(traceId, { error: "ItemFasilitasService > update", message });
    return {
      code: 500,
      message,
    };
  }
};

// delete !!
exports.hapusItemFasilitas = async (traceId, { nama }) => {
  let message = "";
  try {

    //validation
    const isNamaExist = await ItemFasilitasRepo.isNamaExist(nama);
    if (!isNamaExist) {
      message = "barang tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete !!
    await ItemFasilitasRepo.deleteWhereNama(nama);

    // render
    message = "berhasil menghapus Item Fasilitas!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "ItemFasilitasService > hapusItemFasilitas",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};