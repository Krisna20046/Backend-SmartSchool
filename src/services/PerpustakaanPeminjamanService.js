const { print } = require("../utils/services");

// Repository
const PerpustakaanPeminjaman = require("../models/repositories/PerpustakaanPeminjamanRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");
const PerpustakaanBukuRepo = require("../models/repositories/PerpustakaanBukuRepo");

// -----------------------------------------------------------------------------------

// CREATE
exports.pinjamBuku = async (
  traceId,
  id_sekolah,
  { id_buku, id_user, jumlah, tanggal_peminjaman, tanggal_pengembalian }
) => {
  let message = "";
  try {
    // validasi body
    if (
      !(
        id_buku &&
        id_user &&
        jumlah &&
        tanggal_peminjaman &&
        tanggal_pengembalian
      )
    ) {
      message =
        "body (id_buku, id_user, jumlah, tanggal_peminjaman, tanggal_pengembalian) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // validation
    const isUserExist = await UsersRepo.isIdExist(id_user);
    if (!isUserExist) {
      message = "id user tidak tersedia!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // validation
    const isBukuExist = await PerpustakaanBukuRepo.isIdExist(id_buku);
    if (!isBukuExist) {
      message = "id buku tidak tersedia!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await PerpustakaanPeminjaman.insertNew({
      id_sekolah,
      id_buku,
      id_user,

      jumlah,
      tanggal_peminjaman,
      tanggal_pengembalian,
    });


    // render
    message = "anda berhasil meminjam buku!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "PerpustakaanPeminjaman > pinjamBuku", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.pagination = async (traceId, { show, page }) => {
  try {
    const result = await PerpustakaanPeminjaman.showPagination(show, page);
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
      error: "PerpustakaanPeminjaman > pagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

// update
exports.update = async (
  traceId,
  { id, id_buku, id_user, jumlah, tanggal_peminjaman, tanggal_pengembalian }
) => {
  let message = "";
  try {
    //validasi body
    if (!(id_buku || id_user || jumlah || tanggal_peminjaman || tanggal_pengembalian)) {
      message = "body (id / id_buku / id_user / jumlah / tanggal_peminjaman / tanggal_pengembalian) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update !!
    await PerpustakaanPeminjaman.updateWhereUserId(id, {
      id_buku,
      id_user,
      jumlah,
      tanggal_peminjaman,
      tanggal_pengembalian,
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
    print(traceId, { error: "PerpustakaanPeminjaman > update", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.hapusPerpustakaanPeminjaman = async (traceId, { id }) => {
  let message = "";
  try {

    // validation
    const isIdExist = await PerpustakaanPeminjaman.isIdExist(id);
    if (!isIdExist) {
      message = "id peminjaman tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    //delete !!
    await PerpustakaanPeminjaman.deleteWhereId(id);

    //render
    message = "berhasil menghapus buku!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "PerpustakaanPeminjaman > hapusPerpustakaanPeminjaman", message });
    return {
      code: 500,
      message,
    };
  }
};