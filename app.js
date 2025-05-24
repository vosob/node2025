import "dotenv/config";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import routes from "./routes/index.js";
import "./db.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // <-- тут
app.use(routes);

// Errors 404
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Errors 500
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("Interval server error");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
