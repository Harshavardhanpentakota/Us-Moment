"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

// Define your Resource type here if not already defined
export type Resource = {
  topicId: string
  status: "pending" | "processing" | "success" | "failed"
  title: string
  post_link: string
  yt_link: string
  lc_link: string | null
  difficulty: number
}

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
        onCheckedChange={(value:boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value:boolean) => row.toggleSelected(!!value)}
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
    cell: ({ row }) => (
      <a href={row.original.post_link} target="_blank" rel="noopener noreferrer">
        Article
      </a>
    ),
  },
  {
    accessorKey: "yt_link",
    header: "Youtube",
    cell: ({ row }) => (
      <a href={row.original.yt_link} target="_blank" rel="noopener noreferrer">
        Watch
      </a>
    ),
  },
  {
    accessorKey: "lc_link",
    header: "Practice",
    cell: ({ row }) => (
      <a href={row.original.lc_link || "#"} target="_blank" rel="noopener noreferrer">
        {row.original.lc_link ? "Practice" : "N/A"}
      </a>
    ),
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.original.difficulty;
      let difficultyLabel = "Unknown";

      if (difficulty === 0) 
      {
        difficultyLabel = "Easy";
        return <span className="text-green-500">{difficultyLabel}</span>;
      }
      else if (difficulty === 1){
        difficultyLabel = "Medium";
        return <span className="text-yellow-500">{difficultyLabel}</span>;
      } 
      else{
        difficultyLabel = "Hard";
        return <span className="text-red-500">{difficultyLabel}</span>;
      } 

      
    },
  },
]
