import React from "react"
import express from "express"
import dsa from "../../resources/dsa.json"
import cn from "../../resources/cn.json"
import os from "../../resources/os.json"
import dataScience from "../../resources/data_science.json"
import webDev from "../../resources/webDev.json"
import flutter from "../../resources/flutter.json"
import react_native from "../../resources/react_native.json"

interface courseFetcherProps{
    courseName: string
}

function courseFetcher({courseName}: courseFetcherProps ){
    const courses= [dsa, cn, os, dataScience, webDev, flutter, react_native];
    courses.map((course) => {
        if(courseName==course){
            return course;
        }
    })
}

export default courseFetcher