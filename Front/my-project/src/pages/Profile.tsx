import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Combobox } from "@/components/ui/combobox";
import StarList from "@/components/starList";
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
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/clerk-react";
import UserProfileSkeleton from "@/components/ui/UserProfile/UserProfileSkeleton";
import ErrorPage from "./ErrorPage";
import { Button } from "@/components/ui/button";
const Profile = () => {
  const [sideBarView, setsideBarView] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  let checkUser = user?.firstName;
  function capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  if (!isSignedIn) {
    return <ErrorPage />;
  }
  if (checkUser) {
    checkUser = capitalize(checkUser);
    const lastNameUser = user?.lastName;
    if (lastNameUser) {
      checkUser = checkUser + " " + capitalize(lastNameUser);
    }
  }
  return (
    <div className="flex flex-row  bg-dark-new">
      <Sidebar
        pageName="profile"
        toggleSideBar={sideBarView}
        setToggleSideBar={setsideBarView}
      />
      <div className="w-full">
        <div className=" flex p-5 justify-between flex-row-reverse  px-10 gap-6 border-b-2">
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
        <div className="px-32 pr-36 py-10">
          <div>
            <p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-2">
              Welcome,
            </p>
            <div className="my-5  border-neon-button border-2 font-satoshi rounded-md p-10 bg-neon-button bg-opacity-20">
              <div className="flex flex-col gap-10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-10">
                    <img
                      src={user?.imageUrl}
                      className="h-28 w-28 rounded-full"
                      alt="User Dp"
                    />
                    <div>
                      <p className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
                        {checkUser}
                      </p>
                      <p>@usMoment</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-dark-new">
                      <div className="flex items-center">
                        <img
                          className="h-5 w-5"
                          src="../../streak.svg"
                          alt="streak"
                        />
                        <p className="text-white">0</p>
                      </div>
                    </Button>
                    <Button className="bg-primary-accent">
                      <div className="flex items-center">
                        <img
                          src="../../edit.svg"
                          className="h-5 w-5"
                          alt="editProfile"
                        />
                        <p className="text-white">Edit Profile</p>
                      </div>
                    </Button>
                  </div>
                </div>
                <div>
                  <ul className="flex justify-evenly">
                    <li>
                      <div className="flex items-center gap-2">
                        <div className="bg-neon-button rounded-lg p-2">
                          <img
                            src="../../mail.svg"
                            alt="mail"
                            className="h-5 w-5"
                          />
                        </div>
                        <p className="text-sm font-medium leading-none">
                          Email
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center gap-2">
                        <div className="bg-neon-button rounded-lg p-2">
                          <img
                            src="../../mail.svg"
                            alt="mail"
                            className="h-5 w-5"
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm text-muted-foreground">
                            Location
                          </p>
                          <small className="text-sm font-medium leading-none">
                            Visakhapatnam
                          </small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center gap-2">
                        <div className="bg-neon-button rounded-lg p-2">
                          <img
                            src="../../mail.svg"
                            alt="mail"
                            className="h-5 w-5"
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm text-muted-foreground">
                            College
                          </p>
                          <small className="text-sm font-medium leading-none">
                            ANITS
                          </small>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="progress" className="p-2 py-5">
                <div className="flex justify-between">
                  <p className="scroll-m-20 pb-3 text-3xl font-semibold tracking-tight first:mt-0">
                    Progress
                  </p>
                  <Combobox />
                </div>
                <div className="rounded-lg grid grid-cols-4 bg-dark-new">
                  <div className="total border-r-2 flex flex-col items-center justify-center px-4 py-6">
                    <div className="relative size-40 m-2">
                      <svg
                        className="size-full -rotate-90"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-gray-200 dark:text-neutral-700"
                          stroke-width="1"
                        ></circle>
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-red-700 "
                          stroke-width="1"
                          stroke-dasharray="100"
                          stroke-dashoffset="25"
                          stroke-linecap="round"
                        ></circle>
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-yellow-500"
                          stroke-width="1"
                          stroke-dasharray="100"
                          stroke-dashoffset="50"
                          stroke-linecap="round"
                        ></circle>
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-blue-600 "
                          stroke-width="1"
                          stroke-dasharray="100"
                          stroke-dashoffset="75"
                          stroke-linecap="round"
                        ></circle>
                      </svg>
                      <div className="absolute text-center top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <span className="text-center text-2xl font-bold text-white">
                          Total
                        </span>
                        <br />
                        <span className="text-center text-2xl font-bold text-white">
                          75%
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-blue-400 px-4  py-2 text-center text-white">
                      Data Science
                    </div>
                  </div>
                  <div className="easy p-6 flex items-center justify-center">
                    <div className="relative size-40">
                      <svg
                        className="size-full -rotate-90"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-gray-200 dark:text-neutral-700"
                          stroke-width="1"
                        ></circle>
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-blue-400 "
                          stroke-width="1"
                          stroke-dasharray="100"
                          stroke-dashoffset="25"
                          stroke-linecap="round"
                        ></circle>
                      </svg>
                      <div className="absolute top-1/2 text-center start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <span className="text-center text-2xl font-bold text-blue-400">
                          Easy
                        </span>
                        <br />
                        <span className="text-center text-2xl font-bold text-white">
                          75%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="medium p-6 flex items-center justify-center">
                    <div className="relative size-40 ">
                      <svg
                        className="size-full -rotate-90"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-gray-200 dark:text-neutral-700"
                          stroke-width="1"
                        ></circle>
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-yellow-500 "
                          stroke-width="1"
                          stroke-dasharray="100"
                          stroke-dashoffset="25"
                          stroke-linecap="round"
                        ></circle>
                      </svg>
                      <div className="absolute text-center  top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <span className="text-center text-2xl font-bold text-white">
                          Medium
                        </span>
                        <br />
                        <span className="text-center text-2xl font-bold text-white">
                          75%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hard p-6 flex items-center justify-center">
                    <div className="relative size-40">
                      <svg
                        className="size-full -rotate-90"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-gray-200 dark:text-neutral-700"
                          stroke-width="1"
                        ></circle>
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-red-700"
                          stroke-width="1"
                          stroke-dasharray="100"
                          stroke-dashoffset="25"
                          stroke-linecap="round"
                        ></circle>
                      </svg>
                      <div className="absolute top-1/2 text-center start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <span className="text-center text-2xl font-bold text-white">
                          Hard
                        </span>
                        <br />
                        <span className="text-center text-2xl font-bold text-white">
                          75%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4 ">
              <div className="col-span-3   border-neon-button border-2 font-satoshi rounded-md p-7 bg-neon-button bg-opacity-20">
                <p className="scroll-m-20 text-2xl font-semibold tracking-tight pb-4">
                  Expertise
                </p>
                <div className="bg-dark-new rounded-md p-4 text-sm">
                  <ul className="gap-y-1">
                    <li className="flex justify-between items-center">
                      <p>Web Development</p>
                      <StarList count={4} />
                    </li>
                    <li className="flex justify-between items-center">
                      <p>Data Structures</p>
                      <StarList count={3} />
                    </li>
                    <li className="flex justify-between items-center">
                      <p>App Development</p>
                      <StarList count={2} />
                    </li>
                    <li className="flex justify-between items-center">
                      <p>Data Science</p>
                      <StarList count={1} />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-span-4 flex flex-col  border-neon-button border-2 font-satoshi rounded-md p-7 bg-neon-button bg-opacity-20">
                <p className="scroll-m-20 text-2xl pb-3 font-semibold tracking-tight">
                  Projects
                </p>
                <div className="bg-dark-new rounded-lg p-4 w-full h-full">
                  <p className="text-center">None</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
