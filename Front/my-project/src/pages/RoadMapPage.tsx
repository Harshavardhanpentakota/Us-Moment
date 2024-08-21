import Sidebar from "@/components/Sidebar";
import UserProfileSkeleton from "@/components/ui/UserProfile/UserProfileSkeleton";
import { useAuth } from "@clerk/clerk-react";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/clerk-react";
import roadmaps from "@/assets/roadmaps.json";
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
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
const RoadMapPage = () => {
  //fetch course credentials
  const { isSignedIn } = useAuth();
  const {roadMapName} = useParams();
  const checkRoadmap = roadmaps.roadMaps.find((roadmap:{title:string}) => roadmap.title === roadMapName);

  if (!checkRoadmap) {
    return <ErrorPage/>;
  }

  return (
    <div className="flex flex-row g-10 bg-dark-new">
      <Sidebar pageName="roadmaps" />
      <div>
        <div className="w-full flex flex-row-reverse p-5  items-center px-10 gap-6 border-b-2">
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
                className=" hidden sm:block text-black shadow-md hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black "
              >
                <SignInButton />
              </Button>
              <Button
                variant={"neon"}
                className="shadow-md text-black hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black "
              >
                <SignUpButton />
              </Button>
            </div>
          )}
        </div>
        <ContentGen title={roadMapName?? ''} />
      </div>
    </div>
  );
};

export default RoadMapPage;
