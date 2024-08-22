import express, { Request, Response } from "express";
import { Account, UserAccountId } from "../db";
import mongoose from "mongoose";

const accountRouter = express.Router();

interface UserCompletionStatus {
    userName: string;
    roadMapName: string;
}

interface UserCompletionResource {
    userName: string;
    roadMapName: string;
    resourceId: string;
    sectionId: string;
    topicId: string;
}

interface UserSavedResource {
    userName: string;
    roadMapName: string;
    resourceId: string;
    sectionId: string;
    topicId: string;
}

interface UserSavedStatus {
    userName: string;
}

accountRouter.get('/completion', async (req: Request, res: Response) => {
    try {
        const { userName, roadMapName } = req.body as UserCompletionStatus;
        const checkUser = await UserAccountId.findOne({ userName });
        if (!checkUser) {
            return res.json({
                success: false,
                msg: "User not found",
            });
        }
        const account = await Account.findOne({ userName });
        if (!account) {
            return res.json({
                success: false,
                msg: "Account not found",
            });
        }
        const completedResources = account.completedResources.find((roadMap) => roadMap.roadMapName === roadMapName);
        return res.json({ completedResources });
    } catch (err) {
        console.log(err);
        return res.json({ msg: "Error loading data(completion)" });
    }
});

accountRouter.get('/saved', async (req: Request, res: Response) => {
    try {
        const { userName } = req.body as UserSavedStatus;
        const checkUser = await UserAccountId.findOne({ userName });
        if (!checkUser) {
            return res.json({
                success: false,
                msg: "User not found",
            });
        }
        const account = await Account.findOne({ userName });
        if (!account) {
            return res.json({
                success: false,
                msg: "Account not found",
            });
        }
        const savedResources = account.savedResources;
        return res.json({
            success: true,
            savedResources,
        });
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            msg: "Error loading data(saved)",
        });
    }
});

accountRouter.post('/completion', async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { userName, roadMapName, resourceId, sectionId, topicId } = req.body as UserCompletionResource;
        const checkUser = await UserAccountId.findOne({ userName });
        if (!checkUser) {
            await session.abortTransaction();
            return res.json({
                success: false,
                msg: "User not found",
            });
        }
        const account = await Account.findOne({ userName });
        if (!account) {
            return res.json({
                success: false,
                msg: "Account not found",
            });
        }
        const checkCompletion = account.completedResources.find((roadMap) =>
            roadMap.roadMapName === roadMapName &&
            roadMap.resourceId === resourceId &&
            roadMap.sectionId === sectionId &&
            roadMap.topicId === topicId
        );
        if (checkCompletion) {
            await session.abortTransaction();
            return res.json({
                success: false,
                msg: "Resource already completed",
            });
        }
        account.completedResources.push({
            roadMapName,
            resourceId,
            sectionId,
            topicId,
        });
        await account.save({ session });
        await session.commitTransaction();
        return res.json({
            success: true,
            msg: "Resource marked as completed",
        });
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        return res.json({
            success: false,
            msg: "Error Posting data(completion)",
        });
    } finally {
        session.endSession();
    }
});

accountRouter.post('/saved', async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { userName, roadMapName, resourceId, sectionId, topicId } = req.body as UserSavedResource;
        const checkUser = await UserAccountId.findOne({ userName });
        if (!checkUser) {
            await session.abortTransaction();
            return res.json({
                success: false,
                msg: "User not found",
            });
        }
        const account = await Account.findOne({ userName });
        if (!account) {
            return res.json({
                success: false,
                msg: "Account not found",
            });
        }
        const checkSaved = account.savedResources.find((roadMap) =>
            roadMap.roadMapName === roadMapName &&
            roadMap.resourceId === resourceId &&
            roadMap.sectionId === sectionId &&
            roadMap.topicId === topicId
        );
        if (checkSaved) {
            await session.abortTransaction();
            return res.json({
                success: false,
                msg: "Resource already saved",
            });
        }
        account.savedResources.push({
            roadMapName,
            resourceId,
            sectionId,
            topicId,
        });
        await account.save({ session });
        await session.commitTransaction();
        return res.json({
            success: true,
            msg: "Resource marked as saved",
        });
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        return res.json({
            success: false,
            msg: "Error Posting data(saved)",
            error: err,
        });
    } finally {
        session.endSession();
    }
});

export { accountRouter };
