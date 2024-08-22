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
    ques_topic: string;
}

interface UserSavedResource {
    userName: string;
    roadMapName: string;
    ques_topic: string;
}

interface UserSavedStatus {
    userName: string;
    roadMapName: string;
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
        const resources = account.resources.find((roadMap) => roadMap.roadMapName === roadMapName);
        const completedResources =  resources?.completedResources;
        return res.json({
            success:true, 
            completed:completedResources
         });
    } catch (err) {
        console.log(err);
        return res.json({
            success:false, 
            msg: "Error loading data(completion)"
         });
    }
});

accountRouter.get('/saved', async (req: Request, res: Response) => {
    try {
        const { userName,roadMapName } = req.body as UserSavedStatus;
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
        const resources = account.resources.find((roadMap) => roadMap.roadMapName === roadMapName);
        const savedResources = resources?.savedResources;
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
        const { userName, roadMapName, ques_topic} = req.body as UserCompletionResource;
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
        const checkRoadmap = account.resources.find((roadMap) =>
            roadMap.roadMapName === roadMapName
        );
        const checkCompletion = checkRoadmap?.completedResources.find((resource) => resource.ques_topic === ques_topic);

        if (checkCompletion) {
            await session.abortTransaction();
            return res.json({
                success: false,
                msg: "Resource already completed",
            });
        }


        if(checkRoadmap){
            await Account.updateOne({userName:userName,
                'resources.roadMapName':roadMapName}, {
                $push : {
                    'resources.$.completedResources': {
                        roadMapName,
                        ques_topic
                    }
                }
            })
        }
        else {
            await Account.updateOne( {userName:userName},{
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
            })
        }
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
        const { userName, roadMapName, ques_topic } = req.body as UserSavedResource;
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
        const checkRoadmap = account.resources.find((roadMap) =>
            roadMap.roadMapName === roadMapName
        );
        const checkSaved = checkRoadmap?.completedResources.find((resource) => resource.ques_topic === ques_topic);

        if (checkSaved) {
            await session.abortTransaction();
            return res.json({
                success: false,
                msg: "Resource already saved",
            });
        }


        if(checkRoadmap){
            await Account.updateOne({userName:userName,
                'resources.roadMapName':roadMapName}, {
                $push : {
                    'resources.$.savedResources': {
                        roadMapName,
                        ques_topic
                    }
                }
            })
        }
        else {
            await Account.updateOne( {userName:userName},{
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
            })
        }
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
