const { print } = require("../utils/services");
const { isArray } = require("../helpers/validation");

// Repository
const PerpustakaanBukuRepo = require("../models/repositories/PerpustakaanBukuRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

// CREATE
exports.tambahBuku = async (
  traceId,
  id_sekolah,
  { cover, judul, penulis, penerbit, jumlah, kategori, sumber, rak_buku }
) => {
  let message = "";
  try {
    // validasi body
    if (
      !(
        cover &&
        judul &&
        penulis &&
        penerbit &&
        jumlah &&
        kategori &&
        sumber &&
        rak_buku
      )
    ) {
      message =
        "body (cover, judul, penulis, penerbit, jumlah, kategori, sumber, rak_buku) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await PerpustakaanBukuRepo.insertNew({
      id_sekolah,

      cover,
      judul,
      penulis,
      penerbit,
      jumlah,
      kategori,
      sumber,
      rak_buku,
    });

    // render
    message = "anda berhasil mendaftarkan buku!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "PerpustakaanBukuService > tambahBuku", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.pagination = async (traceId, { show, page }) => {
  try {
    const result = await PerpustakaanBukuRepo.showPagination(show, page);
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
      error: "PerpustakaanBukuService > pagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

// UPDATE
exports.editBukuPerpustakaan = async (
  traceId,
  { id,
    cover,
    judul,
    penulis,
    penerbit,
    jumlah,
    kategori,
    sumber,
    rak_buku
  }
) => {
  let message = "";
  try {
    // validasi body
    if (
      !(
        cover &&
        judul &&
        penulis &&
        penerbit &&
        jumlah &&
        kategori &&
        sumber &&
        rak_buku
      )
    ) {
      message =
        "body (cover, judul, penulis, penerbit, jumlah, kategori, sumber, rak_buku) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // image harus array
    if (!isArray(cover)) {
      message = "body (cover) is array require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    //update !!
    await PerpustakaanBukuRepo.updateWhereUserId(id, {
      cover,
      judul,
      penulis,
      penerbit,
      jumlah,
      kategori,
      sumber,
      rak_buku
    });

    // render
    message = "berhasil mengubah buku!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "PerpustakaanBukuRepo > editBukuPerpustakaan", message });
    return {
      code: 500,
      message,
    };
  }
};

// DELETE
exports.hapusBukuPerpustakaan = async (traceId, { judul }) => {
  let message = "";
  try {

    // validation
    const isJudulExist = await PerpustakaanBukuRepo.isJudulExist(judul);
    if (!isJudulExist) {
      message = "judul tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    //delete !!
    await PerpustakaanBukuRepo.deleteWhereJudul(judul);

    //render
    message = "berhasil menghapus buku!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "PerpustakaanBukuRepo > hapusBukuPerpustakaan", message });
    return {
      code: 500,
      message,
    };
  }
};
