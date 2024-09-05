"use client";

import { DataTable } from "./data-table";
import { columns, Resource } from "./columns";

interface DemoPageProps {
  data: Resource[];
}

export default function DemoPage({ data }: DemoPageProps) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
