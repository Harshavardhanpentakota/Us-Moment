import { SignUp } from "@clerk/clerk-react";
const Signup = () => {
  return (
    <div>
      <div className="grid h-screen grid-cols-2 ">
       <div
       className="col-span-1 hidden flex-col justify-between bg-neon-button p-8 text-black lg:flex"
        >
          <div className="flex items-center text-3xl font-black">
            UsMoment
          </div>
          <blockquote className="space-y-2">
          <p className="text-lg font-medium">
            "This library has saved me countless hours of work and helped me
             deliver stunning designs to my clients faster than ever before."
          </p>
          <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
    <div className="col-span-2 bg-white flex flex-col justify-center items-center p-8 lg:col-span-1">
      <div className="flex justify-center items-center">
      <SignUp/>
      </div>
    </div>
  </div>
    </div>
  ) ;
};

export default Signup;
