import { Hono } from "hono";
import { Roadmap, Account, UserAccountId } from "./db";
const roadMapRouter= new Hono();

roadMapRouter.get("/:roadMapName", async (c) => {
    try{
        const roadMapName = c.req.param("roadMapName");
        const roadMap = await Roadmap.findOne({ roadMapName: roadMapName });
        if(!roadMap){
            return c.json({
                msg: "Roadmap not found",
            });
        }
        return c.json({ 
            roadMap:roadMap
        });
    }
    catch(err){
        return c.json({
            error:err, 
            msg: "Error loading roadMap(get)"
         });
    }
})

export { roadMapRouter }