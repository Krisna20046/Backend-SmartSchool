const path = require("path");
const fs = require("fs");

const router = require("express").Router();

const endpoint = "/uploader";

const { print } = require("../utils/services");
const { project_root, path_uploader } = require("../consts");

const { nowFormatFileName } = require("../helpers/date");
const random = require("../helpers/random");
const { compress_image } = require("../utils/compress");

// Repository
const ApkVersionRepo = require("../models/repositories/ApkVersionRepo");

// Middlewares
const token_validation = require("../middlewares/token_validation");
const apk_validation = require("../middlewares/apk_validation");

// ==================================================================================
// Path All Directory
const path_temp = path.join(project_root, path_uploader, "temp");

// ----------------------------------------------------------------------------------

const path_user = path.join(project_root, path_uploader, "img", "user");
const path_dokumen = path.join(project_root, path_uploader, "img", "dokumen");
const path_blog = path.join(project_root, path_uploader, "img", "blog");

const path_apk = path.join(project_root, path_uploader, "apk");

// ==================================================================================
// Create folder if not exist

[
  path_temp,
  //------------
  path_user,
  path_dokumen,
  path_blog,
  //------------
  path_apk,
].forEach((target) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
});

// ----------------------------------------------------------------------------------

// Main Function
const uploader_image = async (req, res, path_target) => {
  let message = "";
  const image = req?.files?.image;
  const { compress } = req.body;

  // validation if image not exist
  if (!image) {
    message = "tidak ada gambar yang dikirim!";
    print(req.traceId, { message });
    return res.json({ message });
  }

  // make new name
  const new_filename = nowFormatFileName() + "_" + image.name;
  const ext = String(image.name).split(".").reverse()[0];
  const temp_file = path.join(path_temp, random.Text() + "." + ext);
  const target_file = path.join(path_target, new_filename);

  try {
    // begin
    if (compress === "true") {
      // move to temp
      await image.mv(temp_file);
      // compress
      await compress_image(temp_file, target_file);
      // delete on temp
      fs.rmSync(temp_file, { force: true });
    } else {
      // move !!
      await image.mv(target_file);
    }

    // render
    message = "berhasil mengupload file!";
    const path_fix =
      "/assets/" +
      String(target_file)
        .replace(/\/\//g, "/")
        .replace(/\\/g, "/")
        .split("/assets/")[1]
        .split("/")
        .join("/");
    print(req.traceId, { message, target_file: path_fix });
    return res.json({ message, target_file: path_fix, new_filename });
  } catch (error) {
    message = "terjadi kesalahan pada server saat upload!";
    print(req.traceId, { message });
    return res.status(500).json({ message, stack: error.stack });
  }
};

const uploader_apk = async (req, res) => {
  let message = "";
  const apk_file = req?.files?.apk;
  const { version } = req.body;

  // validation if apk not exist
  if (!apk_file) {
    message = "tidak ada aplikasi yang dikirim!";
    print(req.traceId, { message });
    return res.json({ message });
  }

  try {
    const ext = String(apk_file.name).split(".").reverse()[0];
    const path_apk_name = path.join(
      path_apk,
      `v${version}-${random.Text(5)}.${ext}`
    );

    // move !!
    await apk_file.mv(path_apk_name);

    // insert !!
    await ApkVersionRepo.insertNew({
      version,
      file_path: path_apk_name,
    });

    // render
    message = "berhasil mengupload apk!";
    print(req.traceId, { message });
    return res.json({ message });
  } catch (error) {
    message = "terjadi kesalahan pada server saat upload!";
    print(req.traceId, { message });
    return res.status(500).json({ message, stack: error.stack });
  }
};

// ==================================================================================
// Uploader Router Management

router.post(endpoint + "/user", async (req, res) =>
  uploader_image(req, res, path_user)
);
router.post(endpoint + "/dokumen", async (req, res) =>
  uploader_image(req, res, path_dokumen)
);
router.post(endpoint + "/blog", async (req, res) =>
  uploader_image(req, res, path_blog)
);

router.post(endpoint + "/apk", apk_validation, async (req, res) =>
  uploader_apk(req, res)
);

// ----------------------------------------------------------------------------------

router.delete("/assets/*", token_validation, async (req, res) => {
  const endpoint = String(
    path.join(project_root, path_uploader, req.originalUrl)
  ).replace(/%20/g, " ");
  if (fs.existsSync(endpoint)) {
    if (fs.lstatSync(endpoint).isFile()) {
      fs.rmSync(endpoint, { force: true, maxRetries: 3 });
      return res.json({ message: "berhasil menghapus gambar" });
    }
    return res.status(400).json({ message: "tidak boleh menghapus folder!!" });
  }
  return res.status(404).json({ message: "file tidak ada!" });
});

// ==================================================================================
// Get File & File Not Found!

router.get("/assets*", (req, res, next) => {
  const endpoint = String(
    path.join(project_root, path_uploader, req.originalUrl)
  ).replace(/%20/g, " ");
  if (fs.existsSync(endpoint)) {
    if (fs.lstatSync(endpoint).isFile()) return res.sendFile(endpoint);
  } else {
    if (path.extname(endpoint)) return res.status(404).send("File Not Found!");
  }
  return next();
});

module.exports = router;
