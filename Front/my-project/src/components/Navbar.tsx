import { Button } from "./ui/button";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/clerk-react";
import { SignUpButton } from "@clerk/clerk-react";
const Navbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="w-full flex justify-between items-center px-10 pt-2">
      <div className="flex items-center gap-6">
        <span>
          <p className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            <a href="/">CodeArc.</a>
          </p>
        </span>
      </div>
      <div className="flex items-center gap-6 py-6 md:p-6">
        {isSignedIn ? (
          <Button
            variant={"neon"}
            className="shadow-md hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black "
          >
            <SignOutButton />
          </Button>
        ) : (
          <div className="flex gap-6">
            <Button
              variant={"neon"}
              className=" hidden sm:block shadow-md hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black "
            >
              <SignInButton forceRedirectUrl={"/profile"}/>
            </Button>
            <Button
              variant={"neon"}
              className="shadow-md  hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black "
            >
              <SignUpButton forceRedirectUrl={"/profile"} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
