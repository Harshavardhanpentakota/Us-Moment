import { useState } from "react";
import roadmaps from "@/assets/roadmaps.json";
import dsaMastery from "@/assets/dsa-mastery.json";
import ErrorPage from "@/pages/ErrorPage";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { DataTable } from "@/components/contentTable/data-table";
import { columns, Resource } from "@/components/contentTable/columns";

interface ContentProps {
    roadMapName: string;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    setCompletionCount: React.Dispatch<React.SetStateAction<number>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

const Content: React.FC<ContentProps> = ({ roadMapName, setProgress, setCompletionCount, setTotalCount }) => {
  const [loading] = useState(false);
  const [error] = useState("");
  const roadMapPreq = roadmaps.roadMaps.find(
    (roadmap: { title: string }) => roadmap.title === roadMapName
  );

  if (!roadMapPreq) {
    return <ErrorPage />
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="w-full h-full rounded-md border-neon-button border-2 my-5 p-8">
      {dsaMastery.dsaMastery.map((section, index) => {
        // Extract the topics from the current section
        const topics: Resource[] = section.topics.map((topic) => ({
          topicId: topic.topicId ?? "unknown",
          status: "pending", // Adjust the status based on your actual data
          title: topic.title,
          post_link: topic.post_link ?? "",
          yt_link: topic.yt_link ?? "",
          lc_link: topic.lc_link ?? "",
          difficulty: topic.difficulty,
        }));

        return (
          <div key={index} className="my-5 border-neon-button border-2 font-satoshi rounded-md px-3 bg-neon-button bg-opacity-20">
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-xl text-medium">
                  <div className="flex justify-start scroll-m-20 text-xl font-semibold tracking-tight">
                    <p >Day - {index + 1} : </p>
                    {section.head_step_no}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {/* Render the DataTable within AccordionContent */}
                  <DataTable columns={columns} data={topics} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}

export default Content;
