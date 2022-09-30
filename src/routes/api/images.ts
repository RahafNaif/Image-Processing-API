import express from "express";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import resizeImage from "../../controller/image-processing";

const images = express.Router();
const originalDirectory = path.join(
  __dirname,
  "../../../assets/images/original"
);
const thumbDirectory = path.join(__dirname, "../../../assets/images/thumb");

images.get("/", async (req, res) => {
  const imageName: string = req.query.filename as string;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  const image = path.join(originalDirectory, `${imageName}.jpeg`);
  const resizedImage = path.join(
    thumbDirectory,
    `${imageName}-${width}w-${height}h.jpeg`
  );

  if (fs.existsSync(image)) {
    if (width <= 0 || isNaN(width)) {
      res.status(400).send("Sorry width not valid");
    } else if (height <= 0 || isNaN(height)) {
      res.status(400).send("Sorry height not valid");
    } else {
      try {
        const isImageResized = await resizeImage(imageName, width, height);
        if (isImageResized) {
          const readImage = fs.readFileSync(resizedImage, { flag: "r" });
          res.writeHead(200, { "Content-Type": "image/jpeg" });
          res.write(readImage);
          res.end();
        }
      } catch (e) {
        res.status(400).send("Sorry something happen while processing image");
      }
    }
  } else {
    res.status(400).send("Sorry this image does not exist");
  }
});

export = images;
