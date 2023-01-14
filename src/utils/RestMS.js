const jwt = require("jsonwebtoken");
const axios = require("axios");
const { delay } = require("../helpers/async");

const RestMS = async ({ url, method, body }) => {
  try {
    // create new token for communication
    const new_token = jwt.sign({ is_ms: "User Service" }, "p3mBurU-m4hAr", {
      expiresIn: 60 * 60 * 1, // minute
    });
    const { status, data } = await axios({
      url,
      method,
      data: body,
      headers: { authorization: "Bearer " + new_token },
    });
    if (String(status).startsWith("2")) {
      return data;
    }
    return false;
  } catch (error) {
    const isAxiosError = error?.response?.data?.message;
    const message = isAxiosError ? error.response.data.message : error.message;
    // All Entities Register Here...
    const entities = [
      // Notification
      "Blocks",
      "Messages",
      "Templates",
      // User
      "Account",
      "Address",
      // Data
      "Experiences",
      "Projects",
      "Roles",
      "Skills",
      "SocialMedia",
    ];
    let resend = false;
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      if (String(message).includes(entity)) {
        resend = true;
      }
    }
    if (resend) {
      console.log({ resend, url, method, body });
      await delay(1000);
      return await RestMS({ url, method, body });
    }
    throw new Error(message);
  }
};

module.exports = RestMS;
