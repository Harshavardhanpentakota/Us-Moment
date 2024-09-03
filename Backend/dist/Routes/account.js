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
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const mongoose_1 = __importDefault(require("mongoose"));
const accountRouter = express_1.default.Router();
exports.accountRouter = accountRouter;
accountRouter.get('/completion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, roadMapName } = req.body;
        const checkUser = yield db_1.UserAccountId.findOne({ userName });
        if (!checkUser) {
            return res.json({
                success: false,
                msg: "User not found",
            });
        }
        const account = yield db_1.Account.findOne({ userName });
        if (!account) {
            return res.json({
                success: false,
                msg: "Account not found",
            });
        }
        const resources = account.resources.find((roadMap) => roadMap.roadMapName === roadMapName);
        const completedResources = resources === null || resources === void 0 ? void 0 : resources.completedResources;
        return res.json({
            success: true,
            completed: completedResources
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            msg: "Error loading data(completion)"
        });
    }
}));
accountRouter.get('/saved', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, roadMapName } = req.body;
        const checkUser = yield db_1.UserAccountId.findOne({ userName });
        if (!checkUser) {
            return res.json({
                success: false,
                msg: "User not found",
            });
        }
        const account = yield db_1.Account.findOne({ userName });
        if (!account) {
            return res.json({
                success: false,
                msg: "Account not found",
            });
        }
        const resources = account.resources.find((roadMap) => roadMap.roadMapName === roadMapName);
        const savedResources = resources === null || resources === void 0 ? void 0 : resources.savedResources;
        return res.json({
            success: true,
            savedResources,
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            msg: "Error loading data(saved)",
        });
    }
}));
accountRouter.post('/completion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { userName, roadMapName, ques_topic } = req.body;
        const checkUser = yield db_1.UserAccountId.findOne({ userName });
        if (!checkUser) {
            yield session.abortTransaction();
            return res.json({
                success: false,
                msg: "User not found",
            });
        }
        const account = yield db_1.Account.findOne({ userName });
        if (!account) {
            return res.json({
                success: false,
                msg: "Account not found",
            });
        }
        const checkRoadmap = account.resources.find((roadMap) => roadMap.roadMapName === roadMapName);
        const checkCompletion = checkRoadmap === null || checkRoadmap === void 0 ? void 0 : checkRoadmap.completedResources.find((resource) => resource.ques_topic === ques_topic);
        if (checkCompletion) {
            yield session.abortTransaction();
            return res.json({
                success: false,
                msg: "Resource already completed",
            });
        }
        if (checkRoadmap) {
            yield db_1.Account.updateOne({ userName: userName,
                'resources.roadMapName': roadMapName }, {
                $push: {
                    'resources.$.completedResources': {
                        roadMapName,
                        ques_topic
                    }
                }
            });
        }
        else {
            yield db_1.Account.updateOne({ userName: userName }, {
                $push: {
                    resources: {
                        roadMapName,
                        completedResources: [
                            {
                                roadMapName,
                                ques_topic
                            }
                        ],
                        savedResources: []
                    }
                }
            });
        }
        yield account.save({ session });
        yield session.commitTransaction();
        return res.json({
            success: true,
            msg: "Resource marked as completed",
        });
    }
    catch (err) {
        console.log(err);
        yield session.abortTransaction();
        return res.json({
            success: false,
            msg: "Error Posting data(completion)",
        });
    }
    finally {
        session.endSession();
    }
}));
accountRouter.post('/saved', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { userName, roadMapName, ques_topic } = req.body;
        const checkUser = yield db_1.UserAccountId.findOne({ userName });
        if (!checkUser) {
            yield session.abortTransaction();
            return res.json({
                success: false,
                msg: "User not found",
            });
        }
        const account = yield db_1.Account.findOne({ userName });
        if (!account) {
            return res.json({
                success: false,
                msg: "Account not found",
            });
        }
        const checkRoadmap = account.resources.find((roadMap) => roadMap.roadMapName === roadMapName);
        const checkSaved = checkRoadmap === null || checkRoadmap === void 0 ? void 0 : checkRoadmap.completedResources.find((resource) => resource.ques_topic === ques_topic);
        if (checkSaved) {
            yield session.abortTransaction();
            return res.json({
                success: false,
                msg: "Resource already saved",
            });
        }
        if (checkRoadmap) {
            yield db_1.Account.updateOne({ userName: userName,
                'resources.roadMapName': roadMapName }, {
                $push: {
                    'resources.$.savedResources': {
                        roadMapName,
                        ques_topic
                    }
                }
            });
        }
        else {
            yield db_1.Account.updateOne({ userName: userName }, {
                $push: {
                    resources: {
                        roadMapName,
                        savedResources: [
                            {
                                roadMapName,
                                ques_topic
                            }
                        ],
                        completedResources: []
                    }
                }
            });
        }
        yield account.save({ session });
        yield session.commitTransaction();
        return res.json({
            success: true,
            msg: "Resource marked as saved",
        });
    }
    catch (err) {
        console.log(err);
        yield session.abortTransaction();
        return res.json({
            success: false,
            msg: "Error Posting data(saved)",
            error: err,
        });
    }
    finally {
        session.endSession();
    }
}));
