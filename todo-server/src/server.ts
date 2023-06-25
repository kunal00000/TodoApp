import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/todos", todoRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
