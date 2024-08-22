import dotenv from 'dotenv';
import mongoose, { ObjectId } from "mongoose";
import {  model, Document } from 'mongoose';

dotenv.config({path:'../.env'}); 

if (process.env.DB_URL) {
    mongoose.connect(process.env.DB_URL);
} 
else {
    console.error("Cannot get Db_url");
}

interface IuserAccountId {
    userName: mongoose.Types.ObjectId,
    email: mongoose.Types.ObjectId
}

interface IsavedResources {
    roadMapName:String,
    resourceId:String,
    sectionId:String,
    topicId:String
}

interface ICompletedResource {
    roadMapName: string;
    resourceId: string;
    sectionId: string;
    topicId: string;
}

interface IAccount extends Document {
    userName: ObjectId;
    firstName:string;
    email:string;
    savedResources: IsavedResources[];
    completedResources:ICompletedResource[]
}
interface IUser extends Document {
    email: string;
    userName:string;
    password: string;
    firstName: string;
    lastName: string;
}

interface IRoadmap extends Document {
    title: string;
    sections: {
      title: string;
      topics: {
        title: string;
        resources: {
          title: string;
          articleLink?: string;
          youtubeLink?: string;
          difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
        }[];
      }[];
    }[];
}

const codingProfileSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    link: {
        type: String,
    }
});


const profileSchema = new mongoose.Schema({
    interestedDomain:[String],
    github:String,
    linkedIn:String,
    codingProfile:[codingProfileSchema],
});

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    profile:{
        type:profileSchema,
        required:true
    }
});


const userAccountIdsSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const accountSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    firstName: {
        type:String,
        required:true
    },
    savedResources: [
        {
          roadMapName: {
            type: String,
            required: true,
            trim: true,
          },
            resourseId: { type: String, required: true },
            sectionId: { type: String, required: true },
            topicId: { type: String, required: true },
        },
      ],    
    completedResources: [
        {
          roadMapName: {
            type: String,
            required: true,
            trim: true,
          },
          resourseId: {
             type: String,
             required: true 
          },
          sectionId: {
            type: String,
            required: true
          },
          topicId: {
            type: String,
            required: true
          },
        },
      ],
})

const resourceSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    title: {type:String, 
        required:true
    },
    articleLink:{
        type:String,
    },
    videoLink:{
        type:String,
    },
    difficulty: { type: String, 
        enum: ['Easy', 'Medium', 'Hard'],
        required: true 
    },
})
const topicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    resources: [resourceSchema],
});

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    topics: [topicSchema],
});

const roadmapSchema = new mongoose.Schema({
    title: { type: String, required: true },
    sections: [sectionSchema],
});

export const Roadmap = model<IRoadmap>('Roadmap', roadmapSchema);
export const User = model<IUser>('User',userSchema);
export const Account = model<IAccount>('Account',accountSchema);
export const UserAccountId =  model<IuserAccountId>('UserAccountId',userAccountIdsSchema);

