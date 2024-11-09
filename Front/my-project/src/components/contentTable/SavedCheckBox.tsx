import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const SavedCheckbox = ({ row }:{row:Resource}) => {
    const [saved, setSaved] = useState(row.saved);
  
    return (
      <Checkbox
        checked={saved}
        onCheckedChange={(value: boolean) => {
          setSaved(value);
          row.saved = value; // Optional: Sync back to row data
        }}
        aria-label="Mark as saved"
      />
    );
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