exports.delay = async (timeout = 500) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
};
