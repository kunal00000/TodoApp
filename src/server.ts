import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes";
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: "http://127.0.0.1:5173" }));
app.use("/todos", todoRoutes);

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("Route not found!");
});

app.listen(port, () => {
  console.log(`crush on port ${port}`);
});
