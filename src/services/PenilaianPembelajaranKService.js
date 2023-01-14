const { print } = require("../utils/services");

// Repository
const NilaiSiswa = require("../models/repositories/NilaiSiswaKRepo");
const Kelas = require("../models/repositories/KelasRepo");
const Users = require("../models/repositories/UsersRepo");
const Sekolah = require("../models/repositories/SekolahRepo");

// -----------------------------------------------------------------------------------

/**
get (params)
post (params, body)
put (params, body)
patch (params, body)
delete (params)
 */

//-> Web / Mobile



//-----------------------------Nilai Keterampilan------------------------------------
exports.tambahNilai = async (traceId, id_sekolah, { nisn, nama, kelas, mapel, semester, kategori, nilai }) => {
  let message = "";
  try {
    // validasi body
    if (!(nisn && nama && kelas && mapel && semester && kategori && nilai)) {
      message = "body (nisn, nama, kelas, mapel, semester, kategori, nilai) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // validation
    const isNisnExist = await Users.isUserNameExist(nisn);
    if (!isNisnExist) {
      message = "NISN tidak terdaftar!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // insert / update / delete !!
    await NilaiSiswa.insertNew({
      id_sekolah,
      id_siswa: isNisnExist.id,

      nama,
      kelas,
      mapel,
      semester,
      kategori,
      nilai,
    });

    // render
    message = "berhasil menambah nilai keterampilan siswa!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "NilaiSiswa > tambahNilai", message });
    return {
      code: 500,
      message,
    };
  }
};

// Update
exports.updateNilai = async (traceId, { id, mapel, semester, kategori, nilai }) => {
  let message = "";
  try {
    // validasi body
    if (!(id && mapel && semester && kategori && nilai)) {
      message = "body (id, mapel, semester, kategori, nilai) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update !!
    await NilaiSiswa.updateWhereUserId(id, {
      mapel,
      semester,
      kategori,
      nilai,
    });

    // render
    message = "berhasil mengubah nilai siswa!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "NilaiSiswa > updateNilai", message });
    return {
      code: 500,
      message,
    };
  }
};

// Delete
exports.hapusNilai = async (traceId, { id }) => {
  let message = "";
  try {
    // delete !!
    await NilaiSiswa.deleteWhereId(id);

    // render
    message = "berhasil menghapus nilai siswa!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "NilaiSiswa > hapusNilai", message });
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

    const result = await NilaiSiswa.showPagination(show, page, keyword);
    const sekolah_ids = result.data.map((v) => v.id_sekolah);
    const siswa_ids = result.data.map((v) => v.id_siswa);

    // Detailing

    const list_sekolah = await Sekolah.collectByIds(sekolah_ids);
    const list_siswa = await Users.collectByIds(siswa_ids);
    result.data = result.data.map((v) => {
      v.sekolah = list_sekolah.filter((u) => u.id === v.id_sekolah)[0];
      v.siswa = list_siswa.filter((u) => u.id === v.id_siswa)[0];
      delete v.id_sekolah;
      delete v.id_siswa;
      return v;
    });

    // render
    return {
      code: 200,
      render: { result },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "NilaiSiswa > showPagination", message });
    return {
      code: 500,
      message,
    };
  }
};