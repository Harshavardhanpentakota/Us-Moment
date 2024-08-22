import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { User, UserAccountId } from "../db"; // Ensure these are correctly imported

const userRouter = express.Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { userName, email } = req.body.userId;

        const checkUser = await UserAccountId.findOne({
            $or: [
                { userName: userName },
                { email: email }
            ]
        });

        if (checkUser) {
            await session.abortTransaction();
            return res.status(400).json({ 
                success: false, 
                msg: "UserName already exists" 
            });
        }

        const user = new User(req.body);
        await user.save({ session });
        await session.commitTransaction();
        return res.status(201).json({ 
            success: true, 
            msg: "User created" 
        });

    } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({
            error: err,
            success: false,
            msg: "Error loading data"
        });
    } finally {
        session.endSession();
    }
});

export { userRouter };
