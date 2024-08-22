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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../db"); // Ensure these are correctly imported
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { userName, email } = req.body.userId;
        const checkUser = yield db_1.UserAccountId.findOne({
            $or: [
                { userName: userName },
                { email: email }
            ]
        });
        if (checkUser) {
            yield session.abortTransaction();
            return res.status(400).json({
                success: false,
                msg: "UserName already exists"
            });
        }
        const user = new db_1.User(req.body);
        yield user.save({ session });
        yield session.commitTransaction();
        return res.status(201).json({
            success: true,
            msg: "User created"
        });
    }
    catch (err) {
        yield session.abortTransaction();
        return res.status(500).json({
            error: err,
            success: false,
            msg: "Error loading data"
        });
    }
    finally {
        session.endSession();
    }
}));
