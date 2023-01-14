const { print } = require("../utils/services");
const { isArray, isEmail } = require("../helpers/validation");
const { genders, religions, role_user } = require("../consts");

const RestMS = require("../utils/RestMS");

// Repository
const UsersRepo = require("../models/repositories/UsersRepo");

// ==================================================================================

//-> Create

exports.insertByAdmin = async (
  traceId,
  { nama, no_hp, email, password, role }
) => {
  let message = "";
  try {
    // check kelengkapan body
    if (!(nama && no_hp && email && password && role)) {
      message = "body (nama, no_hp, email, password, role) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    /*    // check role
        if (!role_user.includes(role)) {
          message = "role tidak tersedia!";
          print(traceId, { message });
          return {
            code: 400,
            message,
          };
        } */

    // check email is exist
    const isEmailExist = await UsersRepo.isEmailExist(email);
    if (isEmailExist) {
      message = "email sudah terdaftar!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // INSERT !!
    await UsersRepo.insertNew({
      nama,
      no_hp,
      email,
      password,
      role,
      is_register: true,
    });

    // render
    message = "berhasil menambahkan user dari admin";
    print(traceId, { message });
    return {
      code: 202,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user:admin > insertByAdmin", message });
    return {
      code: 500,
      message,
    };
  }
};

//-> Read

exports.pagination = async (traceId, { show, page, orderby, keyword }) => {
  let message = "";
  try {
    // pemetaan pagination
    const pagination = await UsersRepo.showPagination(
      show,
      page,
      keyword,
      String(orderby).toLowerCase() === "desc"
    );

    // tempelkan semua address yang terkait user
    pagination.data = pagination.data.map((user) => {
      // join kan meta address
      user.address = list_address
        .filter((u) => u.id_user === user.id)
        .map((v) => {
          // delete v.id_user;
          return v.address;
        });
      return user;
    });

    // render
    return {
      code: 200,
      render: pagination,
    };
  } catch (error) {
    const stack = error.stack;
    console.log({ stack });
    message = error.message;
    print(traceId, { error: "user:admin > pagination", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.ids = async (traceId, { ids }) => {
  let message = "";
  try {
    // check apakah ids ada
    if (!ids) {
      message = "body (ids) dibutuhkan";
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    // check apakah ids adalah array
    if (!isArray(ids)) {
      message = "ids harus array";
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    // filter only number
    ids = ids.filter((v) => Number.isInteger(v));

    let list = [];
    if (ids.length > 0) {
      // ambil semua user by list id dari ids
      list = (await UsersRepo.collectByIds(ids)).map((user) => {
        // clean meta
        delete user.otp;
        return user;
      });
    }

    // render
    return {
      code: 200,
      render: {
        list,
      },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user > ids", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.detail = async (traceId, { no_hp }) => {
  let message = "";
  try {
    // check apakah no_hp sudah ada di database
    const user = await UsersRepo.isPhoneNumberExist(no_hp);
    if (user) {
      return {
        code: 200,
        render: {
          ...user,
        },
      };
    }

    // no wa tidak terdaftar
    message = `no_hp "${no_hp}" tidak terdaftar`;
    print(traceId, { message });
    return {
      code: 400,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user > detail", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.profile = async (traceId, id) => {
  let message = "";
  try {
    // check apakah id sudah ada di database
    const user = await UsersRepo.isIdExist(id);
    if (user) {
      print(traceId, {
        json: {
          profile: user,
        },
      });

      // clean meta
      delete user.modified_date;
      delete user.ref_id;
      delete user.otp;
      delete user.password;
      delete user.is_register;
      delete user.is_blocked;

      return {
        code: 200,
        render: {
          ...user,
        },
      };
    }

    // user tidak terdaftar
    message = `id user "${id}" tidak terdaftar`;
    print(traceId, { message });
    return {
      code: 400,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user:admin > profile", message });
    return {
      code: 500,
      message,
    };
  }
};

// Validation
exports.validation = async (traceId, { no_hp }) => {
  let message = "";
  try {
    // check apakah no_hp sudah ada di database
    let user = await UsersRepo.isPhoneNumberExist(no_hp);
    if (user) {
      print(traceId, { message: "nomer terdaftar database" });
      return {
        code: 200,
        render: {
          registered: true,
          blocked: user.is_blocked,
        },
      };
    }

    print(traceId, { message: "nomer tidak terdaftar database" });
    return {
      code: 200,
      render: {
        registered: false,
      },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user > validation", message });
    return {
      code: 500,
      message,
    };
  }
};

//-> Update

exports.updateOtp = async (traceId, { no_hp, ref_id, otp }) => {
  let message = "";
  try {
    // no_hp (selector) wajib
    if (!no_hp) {
      message = "no_hp dibutuhkan di body";
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    // ref_id (selector) wajib
    if (!ref_id) {
      message = "ref_id dibutuhkan di body";
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    // otp (value) wajib
    if (!otp) {
      message = "otp dibutuhkan di body";
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    // update data
    const { affected } = await UsersRepo.updateWherePhoneNumber(
      no_hp,
      {
        ref_id,
        otp,
      }
    );

    // apakah benar2 mengupdate data
    if (affected === 0) {
      message = "otp tidak terupdate";
      print(traceId, { message });
      return {
        code: 500,
        message,
      };
    }

    // render
    message = "berhasil merubah otp";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user > update-otp", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.updateAdmin = async (
  traceId,
  {
    id, // selector
    email,
    password,
    nama,
    no_hp,
    role,
  }
) => {
  let message = "";
  try {
    // id (selector) wajib
    if (!id) {
      message = "id dibutuhkan di body";
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    if (!role_user.includes(role)) {
      message = "role tidak tersedia!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // check apakah id tersedia
    let isUserIdExist = await UsersRepo.isIdExist(id);
    if (!isUserIdExist) {
      message = `id "${id}" tidak ada`;
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    if (isUserIdExist.role === "SA") {
      message = "kamu tidak berhak merubah data super admin !!!";
      print(traceId, { message });
      return {
        code: 401,
        message,
      };
    }

    // check apakah ada yang ingin dirubah
    if (!(no_hp || nama || dob || gender || religion)) {
      message =
        "wajib mengisi salah satu body (no_hp, nama, dob, gender, religion)";
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    // check apakah no_hp sudah terdaftar di database
    const isRegistered = await UsersRepo.isPhoneNumberExist(no_hp);
    if (!isRegistered) {
      // check if phone number is whatsapp registered
      const WhatsApp = await RestMS({
        url:
          process.env.URL_NOTIFICATION_SERVICE +
          "/api/register/status/" +
          no_hp,
        method: "get",
      });
      if (!WhatsApp.registered) {
        message = "nomor anda tidak terdaftar di whatsapp";
        print(traceId, { message });
        return {
          code: 400,
          message,
        };
      }
    }

    if (nama && String(nama).length > 50) {
      message = "nama tidak boleh lebih dari 50 karakter !!!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update data
    const { affected } = await UsersRepo.updateWhereUserId(id, {
      email,
      password,
      nama,
      no_hp,
      role,
    });

    // apakah benar2 mengupdate data
    if (affected === 0) {
      message = "user tidak terupdate";
      print(traceId, { message });
      return {
        code: 500,
        message,
      };
    }

    // render
    message = "berhasil merubah data user";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user:admin > update-admin", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.update = async (traceId, id_user, { email, no_hp, nama }) => {
  let message = "";
  try {
    // check apakah ada yang ingin dirubah
    if (!(email || no_hp || nama)) {
      message = "wajib mengisi salah satu body (email, no_hp, nama)";
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    // check if email is email
    if (email) {
      if (!isEmail(email)) {
        message = "email bukan format email semestinya!";
        print(traceId, { message });
        return {
          code: 400,
          message,
        };
      }
    }

    // check if phone number is whatsapp registered
    if (no_hp && false) {
      const WhatsApp = await RestMS({
        url:
          process.env.URL_NOTIFICATION_SERVICE +
          "/api/register/status/" +
          no_hp,
        method: "get",
      });
      if (!WhatsApp.registered) {
        message = "nomor anda tidak terdaftar di whatsapp";
        print(traceId, { message });
        return {
          code: 400,
          message,
        };
      }
    }

    // validate nama
    if (nama && String(nama).length > 50) {
      message = "nama tidak boleh lebih dari 50 karakter !!!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // update data
    const { affected } = await UsersRepo.updateWhereUserId(id_user, {
      email,
      no_hp,
      nama,
    });

    // apakah benar2 mengupdate data
    if (affected === 0) {
      message = "user tidak terupdate";
      print(traceId, { message });
      return {
        code: 500,
        message,
      };
    }

    // render
    message = "berhasil merubah data user";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    const isAxiosError = error?.response?.data?.message;
    const message = isAxiosError ? error.response.data.message : error.message;
    print(traceId, { error: "user > update", message });
    return {
      code: isAxiosError ? error.response.status : 500,
      message,
    };
  }
};

//-> Delete

exports.delete = async (traceId, { id }) => {
  let message = "";
  try {
    // check apakah data yang ingin di delete sekarang ini ada di database
    const isExist = await UsersRepo.isIdExist(id);
    if (!isExist) {
      message = `user "${id}" tidak ada`;
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete data
    await UsersRepo.deleteWhereId(id);

    // render
    message = "berhasil menghapus user";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user:admin > delete", message });
    return {
      code: 500,
      message,
    };
  }
};

// Non Active User
exports.block = async (traceId, { id }) => {
  let message = "";
  try {
    // id (selector) wajib
    if (!id) {
      message = "id dibutuhkan di body";
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    // check apakah data yang ingin di delete sekarang ini ada di database
    const isExist = await UsersRepo.isIdExist(id);
    if (!isExist) {
      message = `user "${id}" tidak ada`;
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // execute
    await UsersRepo.blockWhereId(id);

    // render
    message = "berhasil memblokir user";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user:admin > block", message });
    return {
      code: 500,
      message,
    };
  }
};
exports.unblock = async (traceId, { id }) => {
  let message = "";
  try {
    // id (selector) wajib
    if (!id) {
      message = "id dibutuhkan di body";
      print(traceId, { message });
      return {
        code: 405,
        message,
      };
    }

    // check apakah data yang ingin di delete sekarang ini ada di database
    const isExist = await UsersRepo.isIdExist(id);
    if (!isExist) {
      message = `user "${id}" tidak ada`;
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // execute
    await UsersRepo.unBlockWhereId(id);

    // render
    message = "berhasil membuka blokir user";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user:admin > unblock", message });
    return {
      code: 500,
      message,
    };
  }
};

// Manage Basic User to Admin
exports.setAdmin = async (traceId, { id }) => {
  let message = "";
  try {
    const isExist = await UsersRepo.isIdExist(id);
    if (isExist) {
      if (isExist.role === "SA") {
        message = "kamu tidak berhak merubah data super admin !!!";
        print(traceId, { message });
        return {
          code: 401,
          message,
        };
      }

      // execute
      await UsersRepo.setAdminWhereId(id);

      // render
      message = "berhasil menjadikan user sebagai admin";
      print(traceId, { message });
      return {
        code: 200,
        message,
      };
    }

    message = "id tidak ditemukan";
    print(traceId, { message });
    return {
      code: 400,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user:admin > set-admin", message });
    return {
      code: 500,
      message,
    };
  }
};
exports.unsetAdmin = async (traceId, { id }) => {
  let message = "";
  try {
    const isExist = await UsersRepo.isIdExist(id);
    if (isExist) {
      if (isExist.role === "SA") {
        message = "kamu tidak berhak merubah data super admin !!!";
        print(traceId, { message });
        return {
          code: 401,
          message,
        };
      }

      // execute
      await UsersRepo.unsetAdminWhereId(id);

      // render
      message = "berhasil menghapus user sebagai admin";
      print(traceId, { message });
      return {
        code: 200,
        message,
      };
    }

    message = "id tidak ditemukan";
    print(traceId, { message });
    return {
      code: 400,
      message,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user:admin > unset-admin", message });
    return {
      code: 500,
      message,
    };
  }
};
