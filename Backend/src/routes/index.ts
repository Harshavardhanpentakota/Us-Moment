import {Route, Router} from "react-router-dom"
import React from 'react'
import express from "express"
import courseRouter from "./courseRoute"
import accountRouter from "./accountRoute"

const mainRouter = express.Router();
mainRouter.use("/course", courseRouter);
mainRouter.use("/account", accountRouter);

export default mainRouter;


