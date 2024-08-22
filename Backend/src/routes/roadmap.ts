import express, { Request, Response } from 'express';
import { Roadmap } from '../db';

const roadMapRouter = express.Router();

// GET /:roadMapName
roadMapRouter.get('/:roadMapName', async (req: Request, res: Response) => {
    try {
        const roadMapName = req.params.roadMapName;
        const roadMap = await Roadmap.findOne({ roadMapName: roadMapName });

        if (!roadMap) {
            return res.status(404).json({
                success:false,
                msg: "Roadmap not found",
            });
        }

        return res.status(200).json({
            success:true,
            roadMapContent: roadMap,
        });
    } catch (err) {
        return res.status(500).json({
            success:false,
            error: err,
            msg: "Error loading roadmap",
        });
    }
});

export { roadMapRouter };
