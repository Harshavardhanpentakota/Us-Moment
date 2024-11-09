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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        res.status(403).json({
            msg: "Invalid token!",
        });
        return;
    }
    token = token.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "");
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
        else {
            res.status(403).json({
                msg: "Incorrect UserId",
            });
        }
    }
    catch (err) {
        res.status(403).json({
            msg: "Invalid token",
        });
    }
});
exports.authMiddleware = authMiddleware;
