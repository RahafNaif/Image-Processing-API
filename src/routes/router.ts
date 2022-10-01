import express, { Response, Router } from "express";
import images from "./api/images";

const router: Router = express.Router();

router.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Welcome to image processing API");
});

router.use("/images", images);

export default router;
