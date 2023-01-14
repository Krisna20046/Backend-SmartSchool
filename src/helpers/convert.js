exports.stringToNumber = (value) => {
  return String(value).replace(/\D/g, "");
};

exports.capitalizeFirstLetter = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
