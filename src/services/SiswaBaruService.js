const fs = require("fs");
const path = require("path");

const { print } = require("../utils/services");

const { isArray } = require("../helpers/validation");

const {
  project_root,
  path_uploader,
  role_user,
  type_dokumen,
} = require("../consts");

const path_user = path.join(project_root, path_uploader, "img", "user");
const path_dokumen = path.join(project_root, path_uploader, "img", "dokumen");

// Repository
const SiswaBaru = require("../models/repositories/SiswaBaruRepo");
const Users = require("../models/repositories/UsersRepo");
const Dokumen = require("../models/repositories/DokumenRepo");
const SiswaWaliMurid = require("../models/repositories/SiswaWaliMuridRepo");

// -----------------------------------------------------------------------------------

exports.pendaftaran = async (
  traceId,
  id_sekolah,
  {
    nama,
    nisn,
    tempat_lahir,
    tanggal_lahir,
    foto,
    no_hp,
    nama_ortu_lk,
    nama_ortu_pr,
    alamat,
    ijazah,
    sertifikat,
    agama,
    jk,
  },
  is_mutasi // true || false
) => {
  let message = "";
  try {
    // validasi body
    if (
      !(
        nama &&
        nisn &&
        tempat_lahir &&
        tanggal_lahir &&
        foto &&
        no_hp &&
        nama_ortu_lk &&
        nama_ortu_pr &&
        alamat &&
        ijazah &&
        sertifikat &&
        agama &&
        jk
      )
    ) {
      message =
        "body (nama, nisn, tempat_lahir, tanggal_lahir, foto, no_hp, nama_ortu_lk, nama_ortu_pr, alamat, ijazah, sertifikat, agama, jk) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // sertifikat harus array
    if (!isArray(sertifikat)) {
      message = "body (sertifikat) is array require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // validation NISN users
    message = "nisn sudah ada di database!";
    const isUserNameExist = await Users.isUserNameExist(nisn);
    if (isUserNameExist) {
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // validation NISN murid baru
    const isNisnExist = await SiswaBaru.isNisnExist(nisn);
    if (isNisnExist) {
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // insert !!
    const new_id_siswa_baru = await SiswaBaru.insertNew({
      id_sekolah,

      nama,
      nisn,
      tempat_lahir,
      tanggal_lahir,
      no_hp,
      nama_ortu_lk,
      nama_ortu_pr,
      alamat,
      foto,
      agama,
      jk,

      is_mutasi,
    });

    // save dokumen (ijazah)
    await Dokumen.insertNew({
      type: type_dokumen.ijazah,
      id_user_baru: new_id_siswa_baru,
      filename: ijazah,
    });

    // save all dokumen (sertifikat)
    sertifikat.forEach(async (filename) => {
      await Dokumen.insertNew({
        type: type_dokumen.sertifikat,
        id_user_baru: new_id_siswa_baru,
        filename,
      });
    });

    // render
    message = "anda berhasil mendaftarkan diri ke sekolahan ini!";
    print(traceId, { message });
    return {
      code: 202,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "SiswaBaru > pendaftaran", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.showPagination = async (traceId, { show, page, keyword }) => {
  let message = "";
  try {
    // validasi nilai
    if (!show) {
      show = 1;
    }
    if (!page) {
      page = 1;
    }
    if (!keyword) {
      keyword = "";
    }

    const list = await SiswaBaru.showPagination(show, page, keyword);

    // render
    return {
      code: 200,
      render: { list },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "SiswaBaru > showPagination", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.statusPendaftaran = async (traceId, id_sekolah, { nisn }) => {
  let message = "";
  try {
    // validation
    const isExist = await Users.isUserNameExist(nisn);
    if (isExist) {
      if (isExist.role !== role_user.murid) {
        return {
          code: 200,
          render: { is_not_murid: true },
        };
      }
      if (isExist.id_sekolah !== id_sekolah) {
        return {
          code: 200,
          render: { is_not_sekolah_origin: true },
        };
      }
      delete isExist.id_sekolah;
      delete isExist.is_alumni;
      delete isExist.role;
      delete isExist.password;
      return {
        code: 200,
        render: { ...isExist, is_lolos: true },
      };
    }
    return {
      code: 200,
      render: { is_lolos: false },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "SiswaBaru > statusPendaftaran", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.terima = async (traceId, id_sekolah, { nisn }) => {
  let message = "";
  try {
    // validation
    const isNisnExist = await SiswaBaru.isNisnExist(nisn);
    if (!isNisnExist) {
      message = "nisn tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const {
      id: id_siswa_baru,
      id_sekolah: id_sekolah_db,
      nama,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      no_hp,
      nama_ortu_lk,
      nama_ortu_pr,
      foto,
      agama,
      jk
    } = isNisnExist;
    if (id_sekolah_db !== id_sekolah) {
      message = "anda tidak boleh mengubah data sekolah lain!!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // buat akun murid
    const id_siswa = await Users.insertNew({
      id_sekolah,

      username: nisn,
      nama,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      foto,
      no_hp,

      nama_ortu_lk,
      nama_ortu_pr,
      agama,
      jk
    });

    // check apakah wali murid sudah ada
    const isWaliMuridExist = await Users.isUserNameExist(no_hp);
    let id_wali = isWaliMuridExist?.id;
    if (!isWaliMuridExist) {
      // buat akun wali murid
      id_wali = await Users.insertNew({
        id_sekolah,

        username: no_hp,
        nama: nama_ortu_lk,

        role: role_user.wali_murid,
      });
    }

    // relasi kan anak dengan wali
    await SiswaWaliMurid.insertNew({
      id_sekolah,

      id_wali,
      id_siswa,
    });

    // switch semua dokumen (id) siswa baru to users
    await Dokumen.switchWhereUserId(id_siswa_baru, id_siswa);

    // menghapus data yang ada di siswa baru
    await SiswaBaru.deleteWhereNisn(nisn);

    // render
    message = "berhasil membuat akun murid dan wali murid!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "SiswaBaru > terima", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.tolak = async (traceId, id_sekolah, { nisn }) => {
  let message = "";
  try {
    // validation
    const isNisnExist = await SiswaBaru.isNisnExist(nisn);
    if (!isNisnExist) {
      message = "nisn tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }
    const user_siswa_baru = { ...isNisnExist };

    // get all dokumen in table
    const all_dokumen = await Dokumen.showDokumenWhereUserIdBaru(
      user_siswa_baru.id
    );

    const option = {
      force: true,
      maxRetries: 3,
      recursive: true,
    };
    try {
      // hapus foto user
      fs.rmSync(path.join(path_user, user_siswa_baru.foto), option);
      // hapus all dokumen
      all_dokumen.forEach((dokumen) => {
        fs.rmSync(path.join(path_dokumen, dokumen.filename), option);
      });
    } catch (error) {
      console.log({ error });
    }

    // hapus data dari siswa baru
    await SiswaBaru.deleteWhereNisn(nisn);

    // hapus semua dokumen di database
    await Dokumen.deleteWhereSiswaBaruId(user_siswa_baru.id);

    // render
    message = "berhasil menolak murid";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "SiswaBaru > tolak", message });
    return {
      code: 500,
      message,
    };
  }
};
