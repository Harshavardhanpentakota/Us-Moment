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

interface IUser {
    email: string;
    userName:string;
    phoneNumber: number;
    password: string;
    firstName: string;
    lastName: string;
    profile: typeof profileSchema
}

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

interface IuserAccountId {
    userName: string;
    email: string;
}


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

interface IResource {
    roadMapName: string;
    ques_topic: string; 
}

interface IRoadMapResources {
    roadMapName: string;
    savedResources: IResource[];
    completedResources: IResource[];
}

interface IAccount extends Document {
    userName: mongoose.Schema.Types.ObjectId;
    firstName: string;
    resources: IRoadMapResources[];
}

const resourceSchema = new mongoose.Schema<IResource>({
    roadMapName: {
      type: String,
      required: true,
      trim: true,
    },
    ques_topic: {
      type: String,
      required: true, 
    },
});
const roadMapResourcesSchema = new mongoose.Schema({
    roadMapName: {
        type: String,
        required: true,
        trim: true,
    },
    savedResources: [resourceSchema],
    completedResources: [resourceSchema],
});

const accountSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      firstName: {
        type: String,
        required: true,
      },
      resources: [roadMapResourcesSchema],
})

// interface ITopic extends Document {
//     topicId: string;
//     step_no: number;
//     sl_no_in_step: number;
//     head_step_no: string;
//     title: string;
//     post_link: string;
//     yt_link: string;
//     cs_link: string;
//     gfg_link?: string;
//     lc_link: string;
//     company_tags?: string[] | null;
//     difficulty: number;
//     ques_topic: { value: string; label: string }[];
//   }
//   const TopicSchema = new mongoose.Schema<ITopic>({
//     topicId: { type: String, required: true },
//     step_no: { type: Number, required: true },
//     sl_no_in_step: { type: Number, required: true },
//     head_step_no: { type: String, required: true },
//     title: { type: String, required: true },
//     post_link: { type: String, required: true },
//     yt_link: { type: String, required: true },
//     cs_link: { type: String, required: true },
//     gfg_link: { type: String },
//     lc_link: { type: String, required: true },
//     company_tags: { type: [String], default: null },
//     difficulty: { type: Number, required: true },
//     ques_topic: [{ value: String, label: String }],
//   });
//   interface ISection extends Document {
//     step_no: number;
//     head_step_no: string;
//     topics: ITopic[];
//   }
//   const SectionSchema = new mongoose.Schema<ISection>({
//     step_no: { type: Number, required: true },
//     head_step_no: { type: String, required: true },
//     topics: { type: [TopicSchema], required: true },
//   });
//   interface IRoadmap extends Document {
//     title: string;
//     sections: ISection[];
//   }
//   const RoadmapSchema = new mongoose.Schema<IRoadmap>({
//     title: { type: String, required: true },
//     sections: { type: [SectionSchema], required: true },
//   });


// export const Roadmap = model<IRoadmap>('Roadmap', RoadmapSchema);
export const User = model<IUser>('User',userSchema);
export const Account = model<IAccount>('Account',accountSchema);
export const UserAccountId =  model<IuserAccountId>('UserAccountId',userAccountIdsSchema);

