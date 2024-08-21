import { Hono } from "hono";
import {Account, UserAccountId} from "./db"
import mongoose from "mongoose";

const accountRouter = new Hono();

interface UserCompletionStatus {
    userName:String,
    roadMapName:String
}

interface UserCompletionResource {
    userName:String,
    roadMapName:String,
    resourceId:String,
    sectionId:String,
    topicId:String
}

interface UserSavedResource {
    userName: String,
    roadMapName: String,
    resourceId: String,
    sectionId: String,
    topicId: String
}

interface UserSavedStatus {
    userName:String
}

accountRouter.get('/completion',async (c) => {
    try{
        const body = await c.req.json<UserCompletionStatus>();
        const userName = body.userName;
        const roadMapName = body.roadMapName;
        const checkUser = await UserAccountId.findOne({ userName:userName});
        if(!checkUser){
            return c.json({
                success:false,
                msg: "User not found",
            });
        }
        const account = await Account.findOne({ userName: userName});
        if(!account){
            return c.json({
                success:false,
                msg: "Account not found",
            });
        }
        const completedResources = account.completedResources.find((roadMap)=>roadMap.roadMapName===roadMapName);
        return c.json({ completedResources });
    }
    catch(err){
        console.log(err);
        return c.json({ msg: "Error loading data(completion)" });
    }  
}); 

accountRouter.get('/saved',async (c) => {
    try{
        const body = await c.req.json<UserSavedStatus>();
        const userName = body.userName;
        const checkUser = await UserAccountId.findOne({ userName:userName});
        if(!checkUser){
            return c.json({
                success:false,
                msg: "User not found",
            });
        }
        const account = await Account.findOne({ userName: userName});
        if(!account){
            return c.json({
                success:false,
                msg: "Account not found",
            });
        }
        const savedResources = account.savedResources;
        return c.json({ 
            success:true,
            savedResources:savedResources
        });
    }
    catch(err){
        console.log(err);
        return c.json({
            success:false, 
            msg: "Error loading data(saved)" 
        });
    }  
}); 

accountRouter.post('/completion',async (c) => {
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const body = await c.req.json<UserCompletionResource>();
        const { userName, roadMapName, resourceId, sectionId, topicId } = body;
        const checkUser = await UserAccountId.findOne({ userName: userName});
        if(!checkUser){
            await session.abortTransaction();
            return c.json({
                success:false,
                msg: "User not found",
            });
        }
        const account = await Account.findOne({ userName: userName});
        if(!account){
            return c.json({
                success:false,
                msg: "Account not found",
            });
        }
        const checkCompletion = account.completedResources.find((roadMap)=>roadMap.roadMapName===roadMapName && roadMap.resourseId===resourceId && roadMap.sectionId===sectionId && roadMap.topicId===topicId);
        if(checkCompletion){
            await session.abortTransaction();
            return c.json({
                success:false,
                msg: "Resource already completed",
            });
        }
        account.completedResources.push({
            roadMapName:roadMapName as string,
            resourseId:resourceId as string,  
            sectionId:sectionId as string,
            topicId:topicId as string
        })
        await account.save({session});
        await session.commitTransaction();
        return c.json({
            success:true,
            msg: "Resource marked as completed",
        });
    }
    catch(err){
        console.log(err);
        await session.abortTransaction();
        return c.json({
            success:false, 
            msg: "Error Posting data(completion)"
         });
    }
    finally {
        session.endSession();
    }

})

accountRouter.post('/saved',async (c) => {
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const body = await c.req.json<UserSavedResource>();
        const { userName, roadMapName, resourceId, sectionId, topicId } = body;
        const checkUser = await UserAccountId.findOne({ userName: userName});
        if(!checkUser){
            await session.abortTransaction();
            return c.json({
                success:false,
                msg: "User not found",
            });
        }
        const account = await Account.findOne({ userName: userName});
        if(!account){
            return c.json({
                success:false,
                msg: "Account not found",
            });
        }
        const checkSaved = account.savedResources.find((roadMap)=>roadMap.roadMapName===roadMapName && roadMap.resourseId===resourceId && roadMap.sectionId===sectionId && roadMap.topicId===topicId);
        if(checkSaved){
            await session.abortTransaction();
            return c.json({
                success:false,
                msg: "Resource already saved",
            });
        }
        account.savedResources.push({
            roadMapName:roadMapName as string,
            resourseId:resourceId as string,  
            sectionId:sectionId as string,
            topicId:topicId as string
        })
        await account.save({session});
        await session.commitTransaction();
        return c.json({
            success:true,
            msg: "Resource marked as saved",
        });
    }
    catch(err){
        console.log(err);
        await session.abortTransaction();
        return c.json({
            msg: "Error Posting data(saved)",
            error:err,
            success:false
         });
    }
    finally {
        session.endSession();
    }

})



export { accountRouter }