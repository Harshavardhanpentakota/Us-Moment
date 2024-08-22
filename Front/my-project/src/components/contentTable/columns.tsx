"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Resource = {
  topicId: string
  status: "pending" | "processing" | "success" | "failed"
  title: string
  post_link: string | null
  yt_link: string | null
  lc_link: string | null
  difficulty: number | null
}

export const columns: ColumnDef<Resource>[] = [
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
      row.original.post_link ? (
        <a href={row.original.post_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Article
        </a>
      ) : (
        <span>Not Available</span>
      )
    ),
  },
  {
    accessorKey: "yt_link",
    header: "YouTube",
    cell: ({ row }) => (
      row.original.yt_link ? (
        <a href={row.original.yt_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          YouTube
        </a>
      ) : (
        <span>Not Available</span>
      )
    ),
  },
  {
    accessorKey: "lc_link",
    header: "Practice",
    cell: ({ row }) => (
      row.original.lc_link ? (
        <a href={row.original.lc_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Practice
        </a>
      ) : (
        <span>Not Available</span>
      )
    ),
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.original.difficulty;
      let difficultyLabel = "Unknown";

      if (difficulty === 0) difficultyLabel = "Easy";
      else if (difficulty === 1) difficultyLabel = "Medium";
      else if (difficulty === 2) difficultyLabel = "Hard";

      return <span>{difficultyLabel}</span>;
    },
  },
]
