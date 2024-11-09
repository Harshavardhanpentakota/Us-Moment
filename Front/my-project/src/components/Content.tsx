import { useState } from "react";
import roadmaps from "@/assets/roadmaps.json";
import roadMapContent from "@/assets/roadmap-content.json";
import ErrorPage from "@/pages/ErrorPage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DataTable } from "@/components/contentTable/data-table";
import { columns, Resource } from "@/components/contentTable/columns";

interface ContentProps {
  roadMapName: string;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setCompletionCount: React.Dispatch<React.SetStateAction<number>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

const Content: React.FC<ContentProps> = ({
  roadMapName,
  setProgress,
  setCompletionCount,
  setTotalCount,
}) => {
  // Initial state setup
  const [loading] = useState(false);
  const [error] = useState("");
  
  // Reset progress and counts
  setProgress(0);
  setCompletionCount(0);
  setTotalCount(0);

  // Find the roadmap prerequisites by its name
  const roadMapPreq = roadmaps.roadMaps.find(
    (roadmap: { title: string }) => roadmap.title === roadMapName
  );

  // Handle case when roadmap is not found
  if (!roadMapPreq) {
    return <ErrorPage />;
  }

  // Fetch the content for the selected roadmap
  const displayContent = roadMapContent.roadMapContent.find(
    (content: { title: string }) => content.title === roadMapName
  );

  // Handle loading and error cases
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div
      className="h-full rounded-md border-neon-button border-2 my-5 p-2 md:p-8"
      style={{ maxWidth: "100vw" }}
    >
      {/* If content exists, map through the sections and render DataTable */}
      {displayContent ? (
        displayContent?.content?.map((section, index) => {
          // Create topics array for each section
          const topics: Resource[] = section.topics.map((topic) => ({
            topicId: topic.topicId ?? "unknown",
            status: "pending",
            title: topic.title,
            post_link: topic.post_link ?? "",
            yt_link: topic.yt_link ?? "",
            lc_link: "lc_link" in topic ? topic.lc_link : "",
            difficulty: "difficulty" in topic ? (topic.difficulty ?? 0) : 0,
            saved: false
          }));

          return (
            <div
              key={index}
              className="my-5 border-neon-button border-2 font-satoshi rounded-md px-3 bg-neon-button bg-opacity-20"
            >
              {/* Accordion to wrap each section */}
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-xl text-medium">
                    <div className="flex justify-start scroll-m-20 text-xl font-semibold tracking-tight">
                      <p>Day - {index + 1} : </p>
                      {section.head_step_no}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* DataTable displaying the topics for this section */}
                    <DataTable columns={columns} data={topics} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })
      ) : (
        // Display "Coming Soon" if no content exists
        <p className="scroll-m-20 text-4xl font-extrabold text-center tracking-tight lg:text-5xl my-20">
          Coming Soon...
        </p>
      )}
    </div>
  );
};

export default Content;
