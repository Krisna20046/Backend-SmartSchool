module.exports = async (timeout = 500) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
};
