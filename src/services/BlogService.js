const { print } = require("../utils/services");
const { isArray } = require("../helpers/validation");

// Repository
const Blog = require("../models/repositories/BlogRepo");
const BlogImage = require("../models/repositories/BlogImageRepo");

// -----------------------------------------------------------------------------------

// -> Web

exports.postingBeritaSekolah = async (
  traceId,
  id_tu,
  id_sekolah,
  { judul, konten, foto }
) => {
  let message = "";
  try {
    // validasi body
    if (!(judul && konten && foto)) {
      message = "body (judul, konten, foto) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // foto harus array
    if (!isArray(foto)) {
      message = "body (foto) is array require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    } else {
      // check first length
      if (foto.length === 0) {
        message = "body (foto) length is 0! ({ image, keterangan })";
        print(traceId, { message });
        return {
          code: 400,
          message,
        };
      }
      // filtering if array in object { image, keterangan }
      foto = foto.filter((v) => v.image && v.keterangan);
      if (foto.length === 0) {
        message = "body (foto) length is 0! (filtered) ({ image, keterangan })";
        print(traceId, { message });
        return {
          code: 400,
          message,
        };
      }
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

    // insert !!
    const id_blog = await Blog.insertNew({
      id_sekolah,
      id_tu,

      prefix,
      judul,
      konten,
    });

    // insert all blog images
    await BlogImage.insertNew(
      foto.map(({ image, keterangan }) => {
        return {
          id_blog,
          image,
          keterangan,
        };
      })
    );

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


    const list = await BlogImage.showPagination(show, page, keyword);
    const blog_ids = list.data.map((v) => v.id_blog);

    // Detailing

    const list_blog = await Blog.collectByIds(blog_ids);
    list.data = list.data.map((v) => {
      v.blog = list_blog.filter((u) => u.id === v.id_blog)[0];
      delete v.id_blog;
      return v;
    });

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
exports.updateBeritaSekolah = async (traceId, { id, judul, konten, foto }) => {
  let message = "";
  try {
    // validasi body
    if (!(id && judul && konten)) {
      message = "body (id, judul, konten) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // foto harus array
    if (!isArray(foto)) {
      message = "body (foto) is array require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

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