import { Hono } from "hono";
import {User,UserAccountId} from "./db"
import mongoose from "mongoose";
const userRouter = new Hono();

userRouter.post("/signup", async (c) => {
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const body = await c.req.json();
        const {userName,email}=body.userId;
        const checkUser = await UserAccountId.findOne({
        $or: [
            { userName: userName },
            { email: email } 
        ]
        });
        if(checkUser){
            await session.abortTransaction();
            return c.json({ 
               success:false,
               msg: "UserName already exists"
            });
        }

    const user = new User(body);
    await user.save({session});
    await session.commitTransaction();
    return c.json({ 
        success:true,
        msg: "User created"
     });

    }
    catch(err){
        return c.json({
            error:err,
            success:false, 
            msg: "Error loading data"
         });
    }
    finally{
        session.endSession();
    }
})

export { userRouter }