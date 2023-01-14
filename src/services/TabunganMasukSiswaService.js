const { print } = require("../utils/services");

const { } = require("../consts");

// Repository
const TabunganMasukSiswaRepo = require("../models/repositories/TabunganMasukSiswaRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.insert = async (
  traceId,
  id_sekolah,
  { nisn, nama, tanggal_waktu, nominal }
) => {
  let message = "";
  try {
    if (!(nisn && nama && tanggal_waktu && nominal)) {
      message = "body (nisn, nama, tanggal_waktu, nominal) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isNisnExist = await UsersRepo.isUserNameExist(nisn);
    if (!isNisnExist) {
      message = "NISN tidak terdaftar!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await TabunganMasukSiswaRepo.insertNew({
      id_sekolah,
      id_siswa: isNisnExist.id,

      nama,
      tanggal_waktu,
      nominal,
    });

    // render
    message = "berhasil menabung dana!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "TabunganMasukSiswaService > insert",
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
    const result = await TabunganMasukSiswaRepo.showPagination(show, page);
    const sekolah_ids = result.data.map((v) => v.id_sekolah);
    const siswa_ids = result.data.map((v) => v.id_siswa);

    // Detailing

    const list_sekolah = await SekolahRepo.collectByIds(sekolah_ids);
    const list_siswa = await UsersRepo.collectByIds(siswa_ids);
    result.data = result.data.map((v) => {
      v.sekolah = list_sekolah.filter((u) => u.id === v.id_sekolah)[0];
      v.siswa = list_siswa.filter((u) => u.id === v.id_siswa)[0];
      delete v.id_sekolah;
      delete v.id_siswa;
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
      error: "TabunganMasukSiswaService > pagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

//update
exports.update = async (
  traceId,
  { id, nisn, nama, tanggal_waktu, nominal }
) => {
  try {

    if (!(nisn && nama && tanggal_waktu && nominal)) {
      message = "body (nisn, nama, tanggal_waktu, nominal) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isNisnExist = await UsersRepo.isUserNameExist(nisn);
    if (!isNisnExist) {
      message = "NISN tidak terdaftar!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await TabunganMasukSiswaRepo.updateWhereUserId(id, {
      id_siswa: isNisnExist.id,
      nama,
      tanggal_waktu,
      nominal
    });

    // render
    message = "berhasil mengubah tabungan masuk!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "TabunganMasukSiswaService > update",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};

//delete
//hapus
exports.hapusTabunganMasuk = async (traceId, { id_siswa}) => {
  let message = "";
  try {

    // delete !!
    await TabunganMasukSiswaRepo.deleteWhereNisn(id_siswa);

    // render
    message = "berhasil menghapus Tabungan Masuk!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "TabunganMasukSiswaService > hapusTabunganMasuk", message });
    return {
      code: 500,
      message,
    };
  }
};
