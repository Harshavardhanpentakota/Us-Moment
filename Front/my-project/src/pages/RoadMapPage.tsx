import Sidebar from "@/components/Sidebar";
import UserProfileSkeleton from "@/components/ui/UserProfile/UserProfileSkeleton";
import { useAuth } from "@clerk/clerk-react";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import roadmaps from "@/assets/roadmaps.json";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ContentGen from "@/components/ContentGen";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
const RoadMapPage = () => {
  //fetch course credentials
  const { isSignedIn } = useAuth();
  const { roadMapName } = useParams();
  const checkRoadmap = roadmaps.roadMaps.find(
    (roadmap: { title: string }) => roadmap.title === roadMapName,
  );
  const [sideBarView, setsideBarView] = useState(false);
  const navigate = useNavigate();
  if (!checkRoadmap) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-row gap-10 bg-dark-new">
      <Sidebar
        pageName="roadmaps"
        toggleSideBar={sideBarView}
        setToggleSideBar={setsideBarView}
      />
      <div>
        <div className="w-full flex  p-5 justify-between flex-row-reverse  px-10 gap-6 border-b-2">
          {isSignedIn ? (
            <div>
              <ClerkLoading>
                <UserProfileSkeleton />
              </ClerkLoading>
              <ClerkLoaded>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-10 w-10",
                        },
                      }}
                      afterSignOutUrl="/signin"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you really want to sign out?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => ({ redirectUrl: "/signin" })}
                      >
                        Sign Out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </ClerkLoaded>
            </div>
          ) : (
            <div className="flex gap-6">
              <Button
                variant={"neon"}
                onClick={() => navigate("/signin")}
                className=" hidden sm:block shadow-md hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black "
              >
                Sign In
              </Button>
              <Button
                variant={"neon"}
                className="shadow-md hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black "
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          )}
          {!sideBarView && (
            <div className="md:hidden flex justify-center items-center">
              <button onClick={() => setsideBarView(!sideBarView)}>
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
          )}
        </div>
        <ContentGen title={roadMapName ?? ""} />
      </div>
    </div>
  );
};

export default RoadMapPage;
