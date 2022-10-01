import express from "express";
import router from "./routes/router";

const app = express();
const port: number = 3000;

app.use("/api", router);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
