import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
const Profile = () => {
  const [sideBarView, setsideBarView] = useState(false);
  const {isSignedIn} = useAuth();
  const {user}=useUser();
  let checkUser = user?.username;
  if(!checkUser || !isSignedIn){
    return <ErrorPage/>
  }
  function capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  checkUser = capitalize(checkUser);
  return (
    <div className="flex flex-row gap-10 bg-dark-new">
      <Sidebar pageName="profile" toggleSideBar = {sideBarView} setToggleSideBar = {setsideBarView}/>
      <div>
        <div className="w-full flex  p-5 justify-between flex-row-reverse  px-10 gap-6 border-b-2">
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
          {
          !sideBarView && (
            <div className="md:hidden flex justify-center items-center">
        <button onClick={() => setsideBarView(!sideBarView)} >
          <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7H19" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
            <path d="M5 12H19" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
            <path d="M5 17H19" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
          </svg>
          </button>
        </div>
          )
        }
        </div>
        <div className="p-10">
        <div>
        <p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-2">Welcome, {checkUser}</p>
        <p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-2">{}</p>
        <div className="my-5 border-neon-button border-2 font-satoshi rounded-md p-10 bg-neon-button bg-opacity-20">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi inventore accusantium consequuntur magni placeat eveniet in repudiandae dolorum! Nobis, repellat eos. Quis repudiandae hic quos! Provident explicabo veniam mollitia aspernatur soluta libero dolor, illum rerum odio quo autem neque non in qui doloremque reiciendis totam, nulla, laboriosam hic quos sequi? Ad quae illum placeat quia laboriosam facilis maxime? Deleniti adipisci earum soluta cupiditate asperiores incidunt neque a! Delectus in iure et, id, possimus cum enim libero culpa maiores fugiat distinctio dolorem deserunt reprehenderit ea sint laboriosam vitae! Asperiores earum, id unde, corporis itaque, nesciunt porro voluptatibus repudiandae quam dolorum rerum!</p>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
