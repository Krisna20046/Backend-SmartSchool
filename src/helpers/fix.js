module.exports = {
  FirstZeros: (value) => {
    return (value < 10 ? "0" : "") + value;
  },
  UrlSlash: (url) => {
    const text = String(String(url).startsWith("/") ? url : `/${url}`).replace(
      /\/\//gi,
      "/"
    );
    return String(text).includes("//") ? Fix.UrlSlash(text) : text;
  },
};
