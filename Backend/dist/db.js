"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountId = exports.Account = exports.User = exports.Roadmap = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
dotenv_1.default.config({ path: '../.env' });
console.log(Number(process.env.PORT));
if (process.env.DB_URL) {
    mongoose_1.default.connect(process.env.DB_URL);
}
else {
    console.error("Cannot get Db_url");
}
mongoose_1.default.connect("mongodb+srv://harshavardhan:harsha1428@cluster0.cc2w3da.mongodb.net/usMoment");
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
const accountSchema = new mongoose_1.default.Schema({
    userName: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    firstName: {
        type: String,
        required: true
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
});
const resourceSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true
    },
    title: { type: String,
        required: true
    },
    articleLink: {
        type: String,
    },
    videoLink: {
        type: String,
    },
    difficulty: { type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
});
const topicSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    resources: [resourceSchema],
});
const sectionSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    topics: [topicSchema],
});
const roadmapSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    sections: [sectionSchema],
});
exports.Roadmap = (0, mongoose_2.model)('Roadmap', roadmapSchema);
exports.User = (0, mongoose_2.model)('User', userSchema);
exports.Account = (0, mongoose_2.model)('Account', accountSchema);
exports.UserAccountId = (0, mongoose_2.model)('UserAccountId', userAccountIdsSchema);
