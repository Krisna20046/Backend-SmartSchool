const path = require("path");
const { print } = require("../utils/services");
const { project_root, role_user } = require("../consts");
const { capitalizeFirstLetter } = require("../helpers/convert");

// Repository
const Users = require("../models/repositories/UsersRepo");

// -----------------------------------------------------------------------------------

exports.Json = async (traceId, sekolah, { nisn }) => {
  let message = "";
  try {
    // validation
    const isUserNameExist = await Users.isUserNameExist(nisn);
    if (!isUserNameExist) {
      message = "nisn tidak ada di database!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    const {
      role,

      nama,
      tempat_lahir,
      tanggal_lahir,
      agama,
      jk,

      foto,
    } = isUserNameExist;
    // validasi apakah akun adalah murid
    if (role !== role_user.murid) {
      message = "akun ini bukanlah murid!";
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // render
    return {
      code: 200,
      render: {
        sekolah,

        nisn,
        nama,
        tempat_lahir,
        tanggal_lahir,
        agama,
        jk,
        foto,
      },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "Template > Example", message });
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
      show = 0;
    }
    if (!page) {
      page = 1;
    }
    if (!keyword) {
      role: role_user.murid
    }

    const list = await Users.showPagination(show, page, keyword);


    // render
    return {
      code: 200,
      render: { list },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "Users > showPagination", message });
    return {
      code: 500,
      message,
    };
  }
};

// const { registerFont, createCanvas, loadImage, Image } = require("canvas");
// /**
//  * Draws a rounded rectangle using the current state of the canvas.
//  * If you omit the last three params, it will draw a rectangle
//  * outline with a 5 pixel border radius
//  * @param {CanvasRenderingContext2D} ctx
//  * @param {Number} x The top left x coordinate
//  * @param {Number} y The top left y coordinate
//  * @param {Number} width The width of the rectangle
//  * @param {Number} height The height of the rectangle
//  * @param {Number} [radius = 5] The corner radius; It can also be an object
//  * @param {Number} [radius.tl = 0] Top left
//  * @param {Number} [radius.tr = 0] Top right
//  * @param {Number} [radius.br = 0] Bottom right
//  * @param {Number} [radius.bl = 0] Bottom left
//  * @param {Boolean} [fill = false] Whether to fill the rectangle.
//  * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
//  */
// function roundRect(
//   ctx,
//   x,
//   y,
//   width,
//   height,
//   radius = 5,
//   fill = false,
//   stroke = true
// ) {
//   if (typeof radius === "number") {
//     radius = { tl: radius, tr: radius, br: radius, bl: radius };
//   } else {
//     radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius };
//   }
//   ctx.beginPath();
//   ctx.moveTo(x + radius.tl, y);
//   ctx.lineTo(x + width - radius.tr, y);
//   ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
//   ctx.lineTo(x + width, y + height - radius.br);
//   ctx.quadraticCurveTo(
//     x + width,
//     y + height,
//     x + width - radius.br,
//     y + height
//   );
//   ctx.lineTo(x + radius.bl, y + height);
//   ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
//   ctx.lineTo(x, y + radius.tl);
//   ctx.quadraticCurveTo(x, y, x + radius.tl, y);
//   ctx.closePath();
//   if (fill) {
//     ctx.fill();
//   }
//   if (stroke) {
//     ctx.stroke();
//   }
// }

// exports.Canvas = async (traceId, sekolah, { nisn }) => {
//   let message = "";
//   try {
//     // validation
//     const isUserNameExist = await Users.isUserNameExist(nisn);
//     if (!isUserNameExist) {
//       message = "nisn tidak ada di database!";
//       print(traceId, { message });
//       return {
//         code: 400,
//         message,
//       };
//     }

//     const {
//       role,

//       nama,
//       tempat_lahir,
//       tanggal_lahir,
//       agama,

//       foto,
//     } = isUserNameExist;
//     // validasi apakah akun adalah murid
//     if (role !== role_user.murid) {
//       message = "akun ini bukanlah murid!";
//       print(traceId, { message });
//       return {
//         code: 400,
//         message,
//       };
//     }

//     //-> config !!
//     const config = {
//       width: 800,
//       height: 1000,
//     };

//     //-> initial !!
//     const canvas = createCanvas(config.width, config.height);
//     const ctx = canvas.getContext("2d");

//     const color = "#ba9307";
//     ctx.strokeStyle = color;
//     ctx.fillStyle = color;
//     const radius = 15;
//     const template_coordinate_x = 30;
//     const template_coordinate_y = 30;
//     const template_width = 30;

//     //-> Header Background Card, x:0,y:0,c.w,c.h
//     roundRect(
//       ctx,
//       template_coordinate_x,
//       template_coordinate_y,
//       config.width - 2 * template_width,
//       150,
//       {
//         tl: radius,
//         tr: radius,
//       },
//       true
//     );

//     //-> Footer Background Card, x:0,y:0,c.w,c.h
//     roundRect(
//       ctx,
//       template_coordinate_x,
//       template_coordinate_y + 450,
//       config.width - 2 * template_width,
//       50,
//       {
//         bl: radius,
//         br: radius,
//       },
//       true
//     );

//     //-> Header Content
//     ctx.textAlign = "center";

//     ctx.font = `400 20px "Helvetica Neue"`;
//     ctx.fillStyle = "#fff";
//     ctx.fillText(sekolah.type, config.width / 2, 60);
//     ctx.font = `400 22px "Helvetica Neue"`;
//     ctx.fillText(sekolah.nama, config.width / 2, 85);
//     ctx.font = `400 20px "Helvetica Neue"`;
//     ctx.fillText(sekolah.alamat, config.width / 2, 125);

//     ctx.font = `900 35px "Helvetica Neue"`;
//     ctx.fillStyle = "#153d7d";
//     ctx.fillText("KARTU PELAJAR", config.width / 2, 170);

//     ctx.font = `italic 19px "Helvetica Neue"`;
//     ctx.fillStyle = "#153d7d";
//     ctx.fillText(
//       "*berlaku selama menjadi siswa disekolah",
//       config.width - 230,
//       template_coordinate_y + 480
//     );

//     //<======= Form Content

//     const form_x = 100;
//     const form_y = 210;
//     const form_key_x = form_x + 222;
//     const form_value_x = form_key_x + 100;
//     let form_key_y = form_y + 20;
//     const form_space = 42;

//     // Add Profile Image
//     const profile_size = 6;
//     const profile_config = {
//       coordinate: {
//         x: form_x,
//         y: form_y,
//       },
//       img: {
//         width: 30 * profile_size,
//         height: 40 * profile_size,
//       },
//     };
//     const profile_image = await loadImage(
//       path.join(project_root, "assets", "img", "user", "siakaaddd.jpg")
//     );
//     ctx.drawImage(
//       profile_image,
//       profile_config.coordinate.x,
//       profile_config.coordinate.y,
//       profile_config.img.width,
//       profile_config.img.height
//     );

//     // Font & Text manage !!
//     ctx.font = `800 20px "Helvetica Neue"`;
//     ctx.fillStyle = "#242D32";
//     ctx.textAlign = "left";
//     ctx.lineWidth = 4;

//     // Content

//     function form_input(title, value) {
//       form_key_y = form_key_y + form_space;
//       ctx.fillText(title, form_key_x, form_key_y);
//       ctx.fillText(`: ${value}`, form_value_x, form_key_y);
//       // garis bawah
//       ctx.beginPath();
//       const jarak_garis_text = 10;
//       ctx.moveTo(form_key_x, form_key_y + jarak_garis_text);
//       ctx.lineTo(form_key_x + 400, form_key_y + jarak_garis_text);
//       ctx.stroke();
//     }

//     form_input("NAMA", nama);
//     form_input("NISN", nisn);
//     form_input("TTL", `${tempat_lahir}, ${tanggal_lahir}`);
//     // form_input("SEKOLAH", sekolah.nama);
//     form_input("AGAMA", capitalizeFirstLetter(agama));

//     // render
//     ctx.save();
//     return {
//       buffer: canvas.toBuffer(),
//     };
//   } catch (error) {
//     message = error.message;
//     print(traceId, { error: "KartuBelajarDigital > Print", message });
//     return {
//       code: 500,
//       message,
//     };
//   }
// };
