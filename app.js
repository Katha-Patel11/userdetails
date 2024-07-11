import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rt from "./src/routes/user.routes.js";

const app = express();

app.use(express.static("frontend"));
app.use(express.static("public"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "20kb" }));

app.use("/api", rt);

export { app };
