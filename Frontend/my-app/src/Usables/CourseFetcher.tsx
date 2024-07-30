import dsa from "../resources/dsa.json"
import cn from "../resources/cn.json"
import os from "../resources/os.json"
import dataScience from "../resources/dataScience.json"
import webDev from "../resources/webDev.json"
import flutter from "../resources/flutter.json"
import reactNative from "../resources/reactNative.json"

interface ID {
    id: number
}

const CourseFetcher = ({id}:ID) => {
    const courses = [dsa, cn, os, dataScience, webDev, flutter, reactNative]
  return courses[id]
}

export default CourseFetcher