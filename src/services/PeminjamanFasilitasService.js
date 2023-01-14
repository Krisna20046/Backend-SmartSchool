const { print } = require("../utils/services");

const { } = require("../consts");

// Repository
const PeminjamanFasilitasRepo = require("../models/repositories/PeminjamanFasilitasRepo");
const ItemFasilitasRepo = require("../models/repositories/ItemFasilitasRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.insert = async (
  traceId,
  id_sekolah,
  { id_item_fasilitas, tanggal_waktu, jam_peminjaman, jumlah }
) => {
  let message = "";
  try {
    if (!(id_item_fasilitas && tanggal_waktu && jam_peminjaman && jumlah)) {
      message =
        "body (id_item_fasilitas, tanggal_waktu, jam_peminjaman, jumlah) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await PeminjamanFasilitasRepo.insertNew({
      id_sekolah,

      id_item_fasilitas,
      tanggal_waktu,
      jam_peminjaman,
      jumlah,
    });

    // render
    message = "berhasil meminjamkan barang!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "PeminjamanFasilitasService > insert",
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
    const result = await PeminjamanFasilitasRepo.showPagination(show, page);
    const sekolah_ids = result.data.map((v) => v.id_sekolah);
    const item_fasilitas_ids = result.data.map((v) => v.id_item_fasilitas);

    // Detailing

    const list_sekolah = await SekolahRepo.collectByIds(sekolah_ids);
    const list_item_fasilitas = await ItemFasilitasRepo.collectByIds(
      item_fasilitas_ids
    );
    result.data = result.data.map((v) => {
      v.sekolah = list_sekolah.filter((u) => u.id === v.id_sekolah)[0];
      v.item_fasilitas = list_item_fasilitas.filter((u) => u.id === v.id_item_fasilitas)[0];
      delete v.id_sekolah;
      delete v.id_item_fasilitas;
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
      error: "PeminjamanFasilitasService > pagination",
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
  { id, id_item_fasilitas, tanggal_waktu, jam_peminjaman, jumlah }
) => {
  let message = "";
  try {

    if (!
      (id_item_fasilitas &&
        tanggal_waktu &&
        jam_peminjaman &&
        jumlah
      )
    ) {
      message = "body (id_item_fasilitas, tanggal_waktu, jam_peminjaman, jumlah) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isIdExist = await PeminjamanFasilitasRepo.isIdExist(id);
    if (!isIdExist) {
      message = "id peminjaman tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await PeminjamanFasilitasRepo.updateWhereId(id, {
      id_item_fasilitas,
      tanggal_waktu,
      jam_peminjaman,
      jumlah,
    });

    // render
    message = "berhasil mengubah peminjaman fasilitas!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "PeminjamanFasilitasService > update",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

//hapus
exports.hapusPeminjamanFasilitas = async (traceId, { id }) => {
  let message = "";
  try {

    //validation
    const isIdExist = await PeminjamanFasilitasRepo.isIdExist(id);
    if (!isIdExist) {
      message = "id peminjaman tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete !!
    await PeminjamanFasilitasRepo.deleteWhereId(id);

    // render
    message = "berhasil menghapus Peminjaman Fasilitas!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "PeminjamanFasilitasRepo > hapusPeminjamanFasilitas", message });
    return {
      code: 500,
      message,
    };
  }
};

