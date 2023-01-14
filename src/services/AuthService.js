const { print } = require("../utils/services");
const { createToken } = require("../utils/jsonwebtoken");
const { expired_token } = require("../consts");

// Repository
const Users = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

//-> Login

exports.Login = async (traceId, { username, password }) => {
  let message = "";
  try {
    // validasi body
    if (!(username && password)) {
      message = "body (username, password) require!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // get id
    const login = await Users.isLogin(username, password);
    if (!login) {
      message = "username atau password salah!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const user = { ...login };
    delete login.create_date;
    delete login.name;
    delete login.foto;
    delete login.username;
    delete login.password;
    delete login.is_alumni;

    // create new token
    const token = createToken({ ...login }, expired_token + "d");

    // set expired
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const expired = date.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });

    delete user.password;

    // render
    return {
      code: 202,
      render: {
        token,
        user,
        expired,
      },
    };
  } catch (error) {
    const message = error.message;
    print(traceId, { error: "auth > login", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.Reset = async (traceId, { username }) => {
  let message = "";
  try {
    // check if username exist
    const isExist = await Users.isUserNameExist(username);
    if (!isExist) {
      message = "username tidak terdaftar!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // reset!!
    await Users.resetPassword(username);

    // render
    message = "berhasil mereset password!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    const message = error.message;
    print(traceId, { error: "auth > login", message });
    return {
      code: 500,
      message,
    };
  }
};
