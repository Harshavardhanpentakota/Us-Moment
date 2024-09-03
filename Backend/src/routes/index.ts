import {Route, Router} from "react-router-dom"
import express from "express"
import { accountRouter } from "./account";

const mainRouter = express.Router();
mainRouter.use("/account", accountRouter);

export {mainRouter};