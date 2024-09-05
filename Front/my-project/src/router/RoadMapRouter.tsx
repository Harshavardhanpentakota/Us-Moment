import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RoadMapPage from "@/pages/RoadMapPage";

const router = createBrowserRouter([
  {
    path: "/:roadMapName",
    element: <RoadMapPage />,
  },
]);

const RoadMapRouter = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default RoadMapRouter;
