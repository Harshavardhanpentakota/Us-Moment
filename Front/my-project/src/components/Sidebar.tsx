import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import roadmaps from "@/assets/roadmaps.json";
import ErrorPage from "@/pages/ErrorPage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Sidebar = ({
  pageName,
  toggleSideBar,
  setToggleSideBar,
}: {
  pageName: string;
  toggleSideBar: boolean;
  setToggleSideBar: (value: boolean) => void;
}) => {
  const tagContent = [
    "DSA Mastery",
    "Web Development Mastery",
    "App Development Mastery",
    "Data Science Mastery",
    "Machine Learning Mastery",
    "AWS Mastery",
    "System Design",
  ];
  const tags = [
    "dsa-mastery",
    "web-dev-mastery",
    "app-dev-mastery",
    "data-science-mastery",
    "machine-learning-mastery",
    "aws-mastery",
    "system-design-mastery",
  ];
  const { roadMapName } = useParams();
  const navigate = useNavigate();
  let isRoadmap = false;
  const { isSignedIn } = useAuth();
  let highLightElement;
  if (roadMapName) {
    const checkRoadmap = roadmaps.roadMaps.find(
      (roadmap: { title: string }) =>
        roadmap.title.toLowerCase() === roadMapName,
    );
    if (!checkRoadmap) {
      return <ErrorPage />;
    } else {
      const ind = roadmaps.roadMaps.findIndex(
        (roadmap: { title: string }) =>
          roadmap.title.toLowerCase() === roadMapName,
      );
      highLightElement = tags[ind];
      isRoadmap = true;
    }
  } else {
    highLightElement = pageName;
  }

  function handleToggle(tag: string) {
    navigate(`/roadmaps/${tag.toLowerCase()}`);
  }

  return (
    <div className="fixed md:relative">
      <div className="h-screen sticky top-0 bg-dark-new hidden md:block">
        <nav className="  h-full flex flex-col border-r shadow-sm px-3">
          <div className="hidden sm:block m-5 p-4 pb-2 justify-between items-center">
            <button onClick={() => navigate("/")}>
              <p className="text-3xl font-inter font-bold">UsMoment</p>
            </button>
          </div>
          <div className="mt-10">
            <ul className="space-y-3 mx-2">
              <li>
                <Button
                  variant={"ghost"}
                  className="w-full gap-2 flex justify-start mx-3"
                  onClick={() => {
                    return isSignedIn
                      ? navigate("/profile")
                      : navigate("/signup");
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0ZM4.02332 13.4163C5.49083 15.6069 7.69511 17 10.1597 17C12.6243 17 14.8286 15.6069 16.2961 13.4163C14.6885 11.9172 12.5312 11 10.1597 11C7.78821 11 5.63095 11.9172 4.02332 13.4163ZM10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.3431 3 7 4.34315 7 6C7 7.65685 8.3431 9 10 9Z"
                      fill={`${highLightElement === "profile" ? "#76C7C0" : "#EAEAEA"}`}
                    />
                  </svg>
                  {highLightElement === "profile" ? (
                    <p className="text-neon-button">Profile</p>
                  ) : (
                    <p>Profile</p>
                  )}
                </Button>
              </li>
              <li>
                <Button
                  variant={
                    highLightElement === "roadmaps" ? "default" : "ghost"
                  }
                  className="w-full gap-2 flex justify-start mx-3"
                >
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.0834 9.50002L19.2855 10.2213C19.5223 10.3634 19.599 10.6705 19.457 10.9073C19.4147 10.9777 19.3559 11.0366 19.2855 11.0788L10.0001 16.65L0.714629 11.0788C0.477839 10.9367 0.401059 10.6296 0.543129 10.3928C0.585359 10.3224 0.644249 10.2635 0.714629 10.2213L1.91672 9.50002L10.0001 14.35L18.0834 9.50002ZM18.0834 14.2L19.2855 14.9213C19.5223 15.0634 19.599 15.3705 19.457 15.6073C19.4147 15.6777 19.3559 15.7366 19.2855 15.7788L10.5145 21.0413C10.1979 21.2314 9.8022 21.2314 9.4856 21.0413L0.714629 15.7788C0.477839 15.6367 0.401059 15.3296 0.543129 15.0928C0.585359 15.0224 0.644249 14.9635 0.714629 14.9213L1.91672 14.2L10.0001 19.05L18.0834 14.2ZM10.5145 0.30876L19.2855 5.57132C19.5223 5.71339 19.599 6.02052 19.457 6.25731C19.4147 6.32769 19.3559 6.38659 19.2855 6.42881L10.0001 12L0.714629 6.42881C0.477839 6.28674 0.401059 5.97961 0.543129 5.74282C0.585359 5.67244 0.644249 5.61355 0.714629 5.57132L9.4856 0.30876C9.8022 0.11876 10.1979 0.11876 10.5145 0.30876Z"
                      fill={`${isRoadmap ? "#76C7C0" : "#EAEAEA"}`}
                    />
                  </svg>
                  {isRoadmap ? (
                    <p className="text-neon-button">Roadmap</p>
                  ) : (
                    <p>RoadMaps</p>
                  )}
                </Button>
                <div>
                  <ScrollArea className="h-48 w-48 rounded-md mx-6 my-2">
                    <div className="p-1 ">
                      {tags.map((tag, index) => (
                        <>
                          {tag === highLightElement ? (
                            <Button
                              key={tag}
                              className="text-xs text-neon-button"
                              variant="ghost"
                              onClick={() => handleToggle(tag)}
                            >
                              {tagContent[index]}
                            </Button>
                          ) : (
                            <Button
                              key={tag}
                              className="text-xs text-gray-600"
                              variant="ghost"
                              onClick={() => handleToggle(tag)}
                            >
                              {tagContent[index]}
                            </Button>
                          )}
                          <Separator className="my-2" />
                        </>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </li>
              <li>
                <Button
                  variant={highLightElement === "blogs" ? "outline" : "ghost"}
                  className="w-full gap-2 flex justify-start mx-3"
                  onClick={() => navigate("/blogs")}
                >
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="6"
                      y="4"
                      width="13"
                      height="17"
                      rx="2"
                      stroke={`${highLightElement === "blogs" ? "#76C7C0" : "#EAEAEA"}`}
                      stroke-width="2"
                    />
                    <path
                      d="M15 10V8"
                      stroke={`${highLightElement === "blogs" ? "#76C7C0" : "#EAEAEA"}`}
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M4 9H8"
                      stroke={`${highLightElement === "blogs" ? "#76C7C0" : "#EAEAEA"}`}
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M4 13H8"
                      stroke={`${highLightElement === "blogs" ? "#76C7C0" : "#EAEAEA"}`}
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M4 17H8"
                      stroke="#FFFFFF"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  <p>Blogs</p>
                </Button>
              </li>
              <li>
                <Button
                  variant={highLightElement === "saved" ? "outline" : "ghost"}
                  className="w-full gap-2 flex justify-start mx-3"
                  onClick={() => {
                    return isSignedIn
                      ? navigate("/saved")
                      : navigate("/signup");
                  }}
                >
                  <svg
                    width="16"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 0H15C15.5523 0 16 0.44772 16 1V20.1433C16 20.4194 15.7761 20.6434 15.5 20.6434C15.4061 20.6434 15.314 20.6168 15.2344 20.5669L8 16.0313L0.76559 20.5669C0.53163 20.7136 0.22306 20.6429 0.0763698 20.4089C0.0264698 20.3293 0 20.2373 0 20.1433V1C0 0.44772 0.44772 0 1 0Z"
                      fill={`${highLightElement === "saved" ? "#76C7C0" : "#EAEAEA"}`}
                    />
                  </svg>
                  <p>Saved</p>
                </Button>
              </li>
            </ul>
            <div></div>
          </div>
        </nav>
      </div>
      {toggleSideBar && (
        <div className="h-screen sticky top-0 bg-dark-new md:hidden">
          <nav className="  h-full flex flex-col border-r shadow-sm px-3">
            <div className="m-2 p-4 pb-2 flex items-center justify-between">
              <button onClick={() => navigate("/")}>
                <p className="text-3xl font-inter font-bold">UsMoment</p>
              </button>
              <button onClick={() => setToggleSideBar(!toggleSideBar)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7H19"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5 12H19"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5 17H19"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-10">
              <ul className="space-y-3 mx-2">
                <li>
                  <Button
                    variant={"ghost"}
                    className="w-full gap-2 flex justify-start mx-3"
                    onClick={() => {
                      return isSignedIn
                        ? navigate("/profile")
                        : navigate("/signup");
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0ZM4.02332 13.4163C5.49083 15.6069 7.69511 17 10.1597 17C12.6243 17 14.8286 15.6069 16.2961 13.4163C14.6885 11.9172 12.5312 11 10.1597 11C7.78821 11 5.63095 11.9172 4.02332 13.4163ZM10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.3431 3 7 4.34315 7 6C7 7.65685 8.3431 9 10 9Z"
                        fill={`${highLightElement === "profile" ? "#76C7C0" : "#EAEAEA"}`}
                      />
                    </svg>
                    {highLightElement === "profile" ? (
                      <p className="text-neon-button">Profile</p>
                    ) : (
                      <p>Profile</p>
                    )}
                  </Button>
                </li>
                <li>
                  <Button
                    variant={
                      highLightElement === "roadmaps" ? "default" : "ghost"
                    }
                    className="w-full gap-2 flex justify-start mx-3"
                  >
                    <svg
                      width="20"
                      height="22"
                      viewBox="0 0 20 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.0834 9.50002L19.2855 10.2213C19.5223 10.3634 19.599 10.6705 19.457 10.9073C19.4147 10.9777 19.3559 11.0366 19.2855 11.0788L10.0001 16.65L0.714629 11.0788C0.477839 10.9367 0.401059 10.6296 0.543129 10.3928C0.585359 10.3224 0.644249 10.2635 0.714629 10.2213L1.91672 9.50002L10.0001 14.35L18.0834 9.50002ZM18.0834 14.2L19.2855 14.9213C19.5223 15.0634 19.599 15.3705 19.457 15.6073C19.4147 15.6777 19.3559 15.7366 19.2855 15.7788L10.5145 21.0413C10.1979 21.2314 9.8022 21.2314 9.4856 21.0413L0.714629 15.7788C0.477839 15.6367 0.401059 15.3296 0.543129 15.0928C0.585359 15.0224 0.644249 14.9635 0.714629 14.9213L1.91672 14.2L10.0001 19.05L18.0834 14.2ZM10.5145 0.30876L19.2855 5.57132C19.5223 5.71339 19.599 6.02052 19.457 6.25731C19.4147 6.32769 19.3559 6.38659 19.2855 6.42881L10.0001 12L0.714629 6.42881C0.477839 6.28674 0.401059 5.97961 0.543129 5.74282C0.585359 5.67244 0.644249 5.61355 0.714629 5.57132L9.4856 0.30876C9.8022 0.11876 10.1979 0.11876 10.5145 0.30876Z"
                        fill={`${isRoadmap ? "#76C7C0" : "#EAEAEA"}`}
                      />
                    </svg>
                    {isRoadmap ? (
                      <p className="text-neon-button">Roadmap</p>
                    ) : (
                      <p>RoadMaps</p>
                    )}
                  </Button>
                  <div>
                    <ScrollArea className="h-48 w-48 rounded-md mx-6 my-2">
                      <div className="p-1 ">
                        {tags.map((tag, index) => (
                          <>
                            {tag.toLowerCase() === highLightElement ? (
                              <Button
                                key={tag}
                                className="text-xs text-neon-button"
                                variant="ghost"
                                onClick={() => handleToggle(tag)}
                              >
                                {tagContent[index]}
                              </Button>
                            ) : (
                              <Button
                                key={tag}
                                className="text-xs text-gray-600"
                                variant="ghost"
                                onClick={() => handleToggle(tag)}
                              >
                                {tagContent[index]}
                              </Button>
                            )}
                            <Separator className="my-2" />
                          </>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </li>
                <li>
                  <Button
                    variant={highLightElement === "blogs" ? "outline" : "ghost"}
                    className="w-full gap-2 flex justify-start mx-3"
                    onClick={() => navigate("/blogs")}
                  >
                    <svg
                      width="24"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="6"
                        y="4"
                        width="13"
                        height="17"
                        rx="2"
                        stroke={`${highLightElement === "blogs" ? "#76C7C0" : "#EAEAEA"}`}
                        stroke-width="2"
                      />
                      <path
                        d="M15 10V8"
                        stroke={`${highLightElement === "blogs" ? "#76C7C0" : "#EAEAEA"}`}
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M4 9H8"
                        stroke={`${highLightElement === "blogs" ? "#76C7C0" : "#EAEAEA"}`}
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M4 13H8"
                        stroke={`${highLightElement === "blogs" ? "#76C7C0" : "#EAEAEA"}`}
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M4 17H8"
                        stroke={`${highLightElement === "blogs" ? "#76C7C0" : "#EAEAEA"}`}
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                    <p>Blogs</p>
                  </Button>
                </li>
                <li>
                  <Button
                    variant={highLightElement === "saved" ? "outline" : "ghost"}
                    className="w-full gap-2 flex justify-start mx-3"
                    onClick={() => {
                      return isSignedIn
                        ? navigate("/saved")
                        : navigate("/signup");
                    }}
                  >
                    <svg
                      width="16"
                      height="21"
                      viewBox="0 0 16 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 0H15C15.5523 0 16 0.44772 16 1V20.1433C16 20.4194 15.7761 20.6434 15.5 20.6434C15.4061 20.6434 15.314 20.6168 15.2344 20.5669L8 16.0313L0.76559 20.5669C0.53163 20.7136 0.22306 20.6429 0.0763698 20.4089C0.0264698 20.3293 0 20.2373 0 20.1433V1C0 0.44772 0.44772 0 1 0Z"
                        fill={`${highLightElement === "saved" ? "#76C7C0" : "#EAEAEA"}`}
                      />
                    </svg>
                    <p>Saved</p>
                  </Button>
                </li>
              </ul>
              <div></div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
