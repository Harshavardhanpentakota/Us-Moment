import roadmaps from "@/assets/roadmaps.json";
import ErrorPage from "@/pages/ErrorPage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"



const ContentGen = ({ title }: { title: string }) => {
  const roadMapName=title;
  const roadMapPreq = roadmaps.roadMaps.find((roadmap:{title:string}) => roadmap.title===roadMapName.toLowerCase());
  if(!roadMapPreq){
    return <ErrorPage/>
  }

  const progress=34;
  const totalCount=455;
  const completionCount=125

  return <div className="m-12 mt-10">
    <div>
      <p className="text-4xl font-satoshi font-bold my-2" >{roadMapPreq.header}</p>
      <p className="mt-5">{roadMapPreq.description}</p>
      <div className="my-5 border-grey-400 border-2 rounded-md px-3 ">
      <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-2xl text-medium" >Key Highlights</AccordionTrigger>
    <AccordionContent>
      <ul className="list-disc ml-5 text-lg">
        <li>Teaches you problem solving by diving deep into DSA, with 450+ modules.</li>
        <li>In-depth video solutions covering brute, better, optimal solutions.</li>
        <li>Well structured articles/notes for quick revision.</li>
        <li>Company tags associated with each problem.</li>
      </ul>
    </AccordionContent>
  </AccordionItem>
</Accordion>
      </div>
      <div className="w-full py-3 px-6 border-2 border-grey-400 rounded-md flex flex-col">
        <div className="flex justify-between" >
          <p>Your Progress: <span>{completionCount}/</span>{totalCount}</p>
          <p><span>{progress}%</span> completed </p>
        </div>
        <Progress value={progress} className="mt-4" />
      </div>
    </div>
  </div>;
};

export default ContentGen;
