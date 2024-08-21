import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/clerk-react";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/clerk-react";
const Navbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="w-full flex justify-between items-center px-10 ">
      <div className="flex items-center gap-6">
        <span>
          <p className="font-satoshi font-semibold text-2xl dark:text-white text-black ml-4 ">
            <a href="/">UsMoment</a>
          </p>
        </span>
      </div>
      <div className="flex items-center gap-6 m-6">
        {isSignedIn ? (
          <Button
            variant={"neon"}
            className="hidden sm:block text-black shadow-md hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black "
          >
            <SignOutButton />
          </Button>
        ) : (
          <div className="flex gap-6">
            <ModeToggle />
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
    </div>
  );
};

export default Navbar;
