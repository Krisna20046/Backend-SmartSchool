const { print } = require("../utils/services");
const { isArray } = require("../helpers/validation");
const { path_uploader } = require("../consts");

// Repository
const Blog = require("../models/repositories/BlogNewRepo");

// -----------------------------------------------------------------------------------

// -> Web

exports.postingBeritaSekolah = async (
  traceId,
  id_tu,
  id_sekolah,
  { judul, konten, image, keterangan }
) => {
  let message = "";
  try {
    // validasi body
    if (!(judul && konten && image && keterangan)) {
      message = "body (judul, konten, image, keterangan) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // buat prefix
    // example : google.com/blog/2022/09/28/siswa-kelas-1-mendapatkan-juara-10-nasional
    const prefix = String(judul)
      .toLowerCase()
      .replace(/[^a-z^0-9]+/g, " ") // hanya boleh huruf dan angka
      .replace(/  /g, " ")
      .replace(/  /g, " ")
      .replace(/  /g, " ")
      .replace(/ /g, "-"); // finish

    // validation
    const isPrefixExist = await Blog.isPrefixExist(prefix);
    if (isPrefixExist) {
      message = "judul sudah ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    console.log(image);

    // insert !!
    await Blog.insertNew({
      id_sekolah,
      id_tu,

      prefix,
      judul,
      konten,
      image: (path_uploader + "/img/blog/" + image),
      keterangan,
    });

    // insert all blog images


    // render
    message = "berita sekolah berhasil disimpan!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "Blog > postingBeritaSekolah", message });
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


    const list = await Blog.showPagination(show, page, keyword);

    // render
    return {
      code: 200,
      render: { list },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "Blog > showPagination", message });
    return {
      code: 500,
      message,
    };
  }
};

//update
exports.updateBeritaSekolah = async (traceId, { id, judul, konten, image, keterangan }) => {
  let message = "";
  try {
    // validasi body
    if (!(judul && konten && image && keterangan)) {
      message = "body (id, judul, konten, image, keterangan) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // foto harus array


    const prefix = String(judul)
      .toLowerCase()
      .replace(/\+/, " ")
      .replace(/\&/, " ")
      .replace(/\./, "")
      .split(" ")
      .join("-");

    // validation
    const isPrefixExist = await Blog.isPrefixExist(prefix);
    if (isPrefixExist) {
      message = "judul sudah ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update !!
    await Blog.updateWhereUserId(id, {
      prefix,
      judul,
      konten,
      image: (path_uploader + "/img/blog/" + image),
      keterangan,
    });

    // render
    message = "berhasil mengubah berita sekolah!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "Blog > updateBeritaSekolah", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.hapusBeritaSekolah = async (traceId, { prefix }) => {
  let message = "";
  try {
    // validation
    const isPrefixExist = await Blog.isPrefixExist(prefix);
    if (!isPrefixExist) {
      message = "prefix tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete !!
    await Blog.deleteWherePrefix(prefix);

    // render
    message = "berhasil menghapus berita sekolah!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "Blog > hapusBeritaSekolah", message });
    return {
      code: 500,
      message,
    };
  }
};

//-> Mobile