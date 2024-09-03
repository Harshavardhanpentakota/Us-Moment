"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountId = exports.Account = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const conn_1 = __importDefault(require("./conn"));
(0, conn_1.default)();
const codingProfileSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    link: {
        type: String,
    }
});
const profileSchema = new mongoose_1.default.Schema({
    interestedDomain: [String],
    github: String,
    linkedIn: String,
    codingProfile: [codingProfileSchema],
});
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profile: {
        type: profileSchema,
        required: true
    }
});
const userAccountIdsSchema = new mongoose_1.default.Schema({
    userName: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true
    }
});
const resourceSchema = new mongoose_1.default.Schema({
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
const roadMapResourcesSchema = new mongoose_1.default.Schema({
    roadMapName: {
        type: String,
        required: true,
        trim: true,
    },
    savedResources: [resourceSchema],
    completedResources: [resourceSchema],
});
const accountSchema = new mongoose_1.default.Schema({
    userName: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    firstName: {
        type: String,
        required: true,
    },
    resources: [roadMapResourcesSchema],
});
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
exports.User = (0, mongoose_2.model)('User', userSchema);
exports.Account = (0, mongoose_2.model)('Account', accountSchema);
exports.UserAccountId = (0, mongoose_2.model)('UserAccountId', userAccountIdsSchema);
