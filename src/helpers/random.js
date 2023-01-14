const all_characters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const otp_characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

exports.Text = (length = 20) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += all_characters.charAt(
      Math.floor(Math.random() * all_characters.length)
    );
  }
  return result;
};

exports.OTP = (length = 4) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += otp_characters.charAt(
      Math.floor(Math.random() * otp_characters.length)
    );
  }
  return result;
};
