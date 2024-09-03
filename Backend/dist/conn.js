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
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
// Construct the absolute path to the global-bundle.pem file
const tlsCAFilePath = path_1.default.resolve("./", 'global-bundle.pem');
// MongoDB connection string with reference to the certificate file
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (mongoose_1.default.connection.readyState === 0) {
            const dbUrl = process.env.DB_URL;
            if (!dbUrl) {
                throw new Error('DB_URL is not set in environment variables');
            }
            yield mongoose_1.default.connect(dbUrl, {
                directConnection: true,
            });
            console.log('Connected to DocumentDB');
        }
        else {
            console.log('Already connected to DocumentDB');
        }
    }
    catch (err) {
        console.error('Error connecting to DocumentDB:', err);
    }
});
exports.default = connectDB;
