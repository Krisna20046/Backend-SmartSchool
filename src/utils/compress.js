const sharp = require("sharp");

exports.compress_image = async (image_temp, image_target) => {
  const image = sharp(image_temp);
  const meta = await image.metadata();
  const { format } = meta;
  const config = {
    jpeg: { quality: 80 },
    webp: { quality: 80 },
    png: { compressionLevel: 8 },
  };
  await image[format](config[format]).toFile(image_target);
};
