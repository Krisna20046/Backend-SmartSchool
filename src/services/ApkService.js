const fs = require("fs");
const { print } = require("../utils/services");

// Repository
const ApkVersion = require("../models/repositories/ApkVersionRepo");

// ==================================================================================

exports.now = async (traceId) => {
  try {
    const now = await ApkVersion.latestApp("version");
    // render
    print(traceId, { json: { now_version: now } });
    return {
      code: 200,
      render: {
        now,
      },
    };
  } catch (error) {
    const message = error.message;
    print(traceId, { error: "apk > now", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.downloadLatest = async (traceId, res) => {
  try {
    const file_path = await ApkVersion.latestApp("file_path");
    // render
    print(traceId, { json: { file_path } });
    return res.download(file_path);
  } catch (error) {
    const message = error.message;
    print(traceId, { error: "apk > downloadLatest", message });
    return res.status(500).send(message);
  }
};

exports.check = async (traceId, { version }) => {
  try {
    const [v1, v2, v3] = String(version).split(".");
    const now = await ApkVersion.latestApp("version");
    const [n1, n2, n3] = String(now).split(".");

    message = `version terbaru adalah ${now}`;
    // 1.2.3
    // 1.2.4

    if (!(parseInt(v1) >= parseInt(n1))) {
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }
    if (!(parseInt(v2) >= parseInt(n2))) {
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }
    if (!(parseInt(v3) > parseInt(n3))) {
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // render
    message = `ready to update!`;
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    const message = error.message;
    print(traceId, { error: "apk > now", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.listAllApk = async (traceId) => {
  try {
    let list = await ApkVersion.showAll();

    // cleaning...
    list = list.map((v) => {
      delete v.id;
      return v;
    });

    // render
    return {
      code: 200,
      render: {
        list,
      },
    };
  } catch (error) {
    const message = error.message;
    print(traceId, { error: "apk > listAllApk", message });
    return {
      code: 500,
      message,
    };
  }
};

exports.deleteApk = async (traceId, { version }) => {
  let message = "";
  try {
    const isVersionExist = await ApkVersion.isVersionExist(version);
    if (!isVersionExist) {
      message = `file aplikasi di version ${version} tidak ada!`;
      print(traceId, { message });
      return {
        code: 400,
        message,
      };
    }

    // delete !!
    await ApkVersion.deleteWhereVersion(version);

    // delete file apk !!
    fs.rmSync(isVersionExist.file_path, {
      force: true,
      maxRetries: 3,
      recursive: true,
    });

    // render
    message = "berhasil menghapus aplikasi!";
    print(traceId, { message });
    return {
      code: 200,
      message,
    };
  } catch (error) {
    const message = error.message;
    print(traceId, { error: "apk > deleteApk", message });
    return {
      code: 500,
      message,
    };
  }
};
