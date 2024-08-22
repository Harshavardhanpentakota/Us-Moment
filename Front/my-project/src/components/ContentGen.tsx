import roadmaps from "@/assets/roadmaps.json";
import ErrorPage from "@/pages/ErrorPage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import Content from "./Content";
const ContentGen = ({ title }: { title: string }) => {
  const roadMapName = title.toLowerCase(); // Ensure case-insensitivity
  const [progress, setProgress] = useState(0);
  const [totalCount, setTotalCount] = useState(0)
  const [completionCount, setCompletionCount] = useState(0)
  const roadMapPreq = roadmaps.roadMaps.find(
    (roadmap: { title: string }) => roadmap.title === roadMapName
  );
  if(!roadMapPreq){
    return <ErrorPage/>
  }

  return (
    <div className="m-12 mt-10">
      <div>
        <p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-2">{roadMapPreq?.header}</p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{roadMapPreq?.description}</p>
        <div className="my-5 border-neon-button border-2 font-satoshi rounded-md px-3 bg-neon-button bg-opacity-20">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl text-medium">Key Highlights</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc ml-5 leading-7 [&:not(:first-child)]:mt-6">
                  <li>Teaches you problem solving by diving deep into DSA, with 450+ modules.</li>
                  <li>In-depth video solutions covering brute, better, optimal solutions.</li>
                  <li>Well-structured articles/notes for quick revision.</li>
                  <li>Company tags associated with each problem.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="w-full py-3 px-6 border-2 border-grey-400 rounded-md flex flex-col">
          <div className="flex justify-between">
            <p>Your Progress: <span>{completionCount}/</span>{totalCount}</p>
            <p><span>{progress}%</span> completed </p>
          </div>
          <Progress value={progress} className="mt-4" />
        </div>
      </div>
      <Content roadMapName={roadMapName} setProgress={setProgress} setCompletionCount={setCompletionCount} setTotalCount={setTotalCount} />
    </div>
  );
};

export default ContentGen;
