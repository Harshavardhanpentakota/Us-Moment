"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = require("./Routes");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 4000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1', Routes_1.mainRouter);
app.listen(port);
