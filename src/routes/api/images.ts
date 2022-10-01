import express, { Router } from "express";
import fs from "fs";
import path from "path";
import resizeImage from "../../services/image-processing";

const images: Router = express.Router();
const originalDirectory: string = path.join(__dirname, "../../../assets/images/original");
const thumbDirectory: string = path.join(__dirname, "../../../assets/images/thumb");

images.get("/", async (req: express.Request, res: express.Response): Promise<void> => {
  const imageName: string = req.query.filename as string;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  const image: string = path.join(originalDirectory, `${imageName}.jpeg`);
  const resizedImage: string = path.join(thumbDirectory, `${imageName}-${width}w-${height}h.jpeg`);

  if (fs.existsSync(image)) {
    if (width <= 0 || isNaN(width)) {
      res.status(400).send("Sorry width not valid");
    } else if (height <= 0 || isNaN(height)) {
      res.status(400).send("Sorry height not valid");
    } else {
      try {
        const isImageResized: boolean = await resizeImage(imageName, width, height);
        if (isImageResized) {
          const readImage: Buffer = fs.readFileSync(resizedImage, { flag: "r" });
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
