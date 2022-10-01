import sharp from "sharp";
import fs from "fs";
import path from "path";

const originalDirectory: string = path.join(
  __dirname,
  "../../assets/images/original"
);
const thumbDirectory: string = path.join(
  __dirname,
  "../../assets/images/thumb"
);

const resizeImage = async (
  imageName: string,
  width: number,
  height: number
): Promise<boolean> => {
  const image: string = path.join(originalDirectory, `${imageName}.jpeg`);
  const resizedImage: string = path.join(
    thumbDirectory,
    `${imageName}-${width}w-${height}h.jpeg`
  );

  if (fs.existsSync(resizedImage)) {
    return true;
  } else {
    try {
      await sharp(image).resize(width, height).toFile(resizedImage);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};

export default resizeImage;
