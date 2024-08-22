"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const account_1 = require("./account");
const roadmap_1 = require("./roadmap");
const mainRouter = express_1.default.Router();
exports.mainRouter = mainRouter;
mainRouter.use("/account", account_1.accountRouter);
mainRouter.use("/roadMap", roadmap_1.roadMapRouter);
