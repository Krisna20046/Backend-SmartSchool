const { print } = require("../utils/services");

// Repository
const NilaiSiswa = require("../models/repositories/NilaiSiswaRepo");
const JadwalPelajaran = require("../models/repositories/JadwalPelajaranRepo");

// -----------------------------------------------------------------------------------

/**
get (params)
post (params, body)w
put (params, body)
patch (params, body)
delete (params)
 */

//-> Web / Mobile

exports.insertNilaiSiswa = async (
  traceId,
  id_sekolah,
  id_siswa,
  id_mapel,

  //basic
  { nilai }
) => {
  let message = "";
  try {
    // validasi body
    if (!(nilai)) {
      message = "body (nilai) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // validation jadwal
    const isJadwalExist = await JadwalPelajaran.isExist(id_mapel);
    if (!isJadwalExist) {
      message = "Jadwal Pelajaran tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    //insert
    const id_mapel = await JadwalPelajaran.insertNilaiSiswa({
      id_sekolah,
      id_siswa,
      id_mapel,

      nilai,
    });

    // render
    message = "Nilai Siswa berhasil disimpan!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "NiliSiswa > insertNilaiSiswa", message });
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

    const list = await NilaiSiswa.showPagination(show, page, keyword);

    // render
    return {
      code: 200,
      render: { list },
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

exports.updateNilaiSiswa = async (traceId, { nilai }) => {
  let message = "";
  try {
    // validasi body
    if (!(nilai)) {
      message = "body (nilai) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update !!
    await NilaiSiswa.updateNilaiSiswa(id_mapel, {
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
    print(traceId, { error: "NilaiSiswa > updateNilaiSiswa", message });
    return {
      code: 500,
      message,
    };
  }
};
