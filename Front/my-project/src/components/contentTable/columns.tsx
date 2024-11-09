"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SavedCheckbox } from "./SavedCheckBox";
// Helper function to validate URLs
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Define your Resource type here if not already defined
export type Resource = {
  topicId: string;
  status: "pending" | "processing" | "success" | "failed";
  title: string;
  post_link: string;
  yt_link: string;
  lc_link: string | null;
  difficulty: number;
  saved: boolean;
};



// Add the checkbox column to your columns array
export const columns: ColumnDef<Resource>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),  
     cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "post_link",
    header: "Article",
    cell: ({ row }) => {
      const postLink = row.original.post_link;
      return isValidUrl(postLink) ? (
        <a
          href={postLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
           <img src="../../../article.svg" height={25} width={25} alt="Article" />
        </a>
      ) : (
        <span>N/A</span>
      );
    },
  },
  {
    accessorKey: "yt_link",
    header: "Youtube",
    cell: ({ row }) => {
      const ytLink = row.original.yt_link;
      return isValidUrl(ytLink) ? (
        <a href={ytLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          <img src="../../../youtube_logo.svg" height={25} width={25} alt="Youtube" />
        </a>
      ) : (
        <span>N/A</span>
      );
    },
  },
  {
    accessorKey: "lc_link",
    header: "Practice",
    cell: ({ row }) => {
      const lcLink = row.original.lc_link;
      return isValidUrl(lcLink || "") ? (
        <a href={lcLink || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          <img src="../../../leetcode.svg" height={25} width={25} alt="Leetcode" />
        </a>
      ) : (
        <span>N/A</span>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.original.difficulty;
      let difficultyLabel = "Unknown";

      if (difficulty === 0) {
        difficultyLabel = "Easy";
        return <span className="text-green-500">{difficultyLabel}</span>;
      } else if (difficulty === 1) {
        difficultyLabel = "Medium";
        return <span className="text-yellow-500">{difficultyLabel}</span>;
      } else {
        difficultyLabel = "Hard";
        return <span className="text-red-500">{difficultyLabel}</span>;
      }
    },
  },
  {
    id: "saved", 
    header: "Saved",
    cell: ({ row }) => <SavedCheckbox row={row.original} />
  },
];


