import express from "express";
import cors from "cors";
import mainRouter from "./routes/index";

const app=express();
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT || 4000);
app.use("/", mainRouter);