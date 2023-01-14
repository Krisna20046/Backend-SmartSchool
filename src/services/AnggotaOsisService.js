const { print } = require("../utils/services");

const {} = require("../consts");

// Repository
const AnggotaOsisRepo = require("../models/repositories/AnggotaOsisRepo");
const SekolahRepo = require("../models/repositories/SekolahRepo");
const UsersRepo = require("../models/repositories/UsersRepo");
const JabatanOsisRepo = require("../models/repositories/JabatanOsisRepo");

// -----------------------------------------------------------------------------------

exports.tambahAnggota = async (
  traceId,
  id_sekolah,
  { id_siswa, id_jabatan }
) => {
  let message = "";
  try {
    if (!(id_siswa && id_jabatan)) {
      message = "body (id_siswa, id_jabatan) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isUserExist = await UsersRepo.isIdExist(id_siswa);
    if (!isUserExist) {
      message = "id siswa tidak ada!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const isJabatanExist = await JabatanOsisRepo.isIdExist(id_jabatan);
    if (!isJabatanExist) {
      message = "id jabatans tidak ada!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    let isDuplicate;
    if (id_jabatan == "5") {
      isDuplicate = await AnggotaOsisRepo.isExist({
        id_sekolah,
        id_siswa,
      });
    } else {
      isDuplicate = await AnggotaOsisRepo.isExist({
        id_sekolah,
        id_siswa,
        id_jabatan,
      });
    }
    if (isDuplicate) {
      message = "jabatan sudah ada yang isi!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    await AnggotaOsisRepo.insertNew({
      id_sekolah,
      id_siswa,
      id_jabatan,
    });

    // render
    message = "berhasil menambahkan privilege anggota osis!";
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, {
      error: "AnggotaOsisService > tambahAnggota",
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
    const result = await AnggotaOsisRepo.showPagination(show, page);
    const sekolah_ids = result.data.map((v) => v.id_sekolah);
    const user_ids = result.data.map((v) => v.id_siswa);
    const jabatan_ids = result.data.map((v) => v.id_jabatan);

    // Detailing

    const list_sekolah = await SekolahRepo.collectByIds(sekolah_ids);
    const list_user = await UsersRepo.collectByIds(user_ids);
    const list_jabatan = await JabatanOsisRepo.collectByIds(jabatan_ids);
    result.data = result.data.map((v) => {
      v.sekolah = list_sekolah.filter((u) => u.id === v.id_sekolah)[0];
      v.siswa = list_user.filter((u) => u.id === v.id_siswa)[0];
      v.jabatan = list_jabatan.filter((u) => u.id === v.id_jabatan)[0];
      delete v.id_sekolah;
      delete v.id_siswa;
      delete v.id_jabatan;
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
      error: "AnggotaOsisService > pagination",
      message,
    });
    return {
      code: 500,
      message,
    };
  }
};
