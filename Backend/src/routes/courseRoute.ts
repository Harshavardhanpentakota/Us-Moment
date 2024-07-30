import express from "express";
import { PrismaClient } from "@prisma/client";
import { Route, Router } from "react-router-dom";
import courseFetcher from "../routes/courseFetcher";

const courseRouter = express.Router();

const courses= ["Data Structures & Algorithms", "Computer Networks", "Operating System", "Data Science", "Web Development", "Flutter Development", "React native Development"];

courseRouter.get("/", async (req, res) => {
    res.json({
        courses:courses
    });
})

courseRouter.get("/explore", async (req, res) => {
    const courseName = req.query.courseName;
   try{
    const courseContent= courseFetcher({courseName:courseName as string});
    res.json({
        courseContent:courseContent
    });
   }
   catch(err){
    console.log(err);
    res.status(500).json({
        msg:"Course Cannot be fetched at the moment"
    })
   }
})

export default courseRouter;