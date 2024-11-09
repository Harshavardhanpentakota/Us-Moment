import express from 'express';
import cors from 'cors';
import { mainRouter } from './Routes';

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);
app.listen(port);