import {Route, Router} from "react-router-dom"
import express from "express"
import { accountRouter } from "./account";
import { roadMapRouter } from "./roadmap";

const mainRouter = express.Router();
mainRouter.use("/account", accountRouter);
mainRouter.use("/roadMap", roadMapRouter);

export {mainRouter};