"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roadMapRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const roadMapRouter = express_1.default.Router();
exports.roadMapRouter = roadMapRouter;
// GET /:roadMapName
roadMapRouter.get('/:roadMapName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roadMapName = req.params.roadMapName;
        const roadMap = yield db_1.Roadmap.findOne({ roadMapName: roadMapName });
        if (!roadMap) {
            return res.status(404).json({
                msg: "Roadmap not found",
            });
        }
        return res.status(200).json({
            roadMap: roadMap,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: err,
            msg: "Error loading roadmap",
        });
    }
}));
