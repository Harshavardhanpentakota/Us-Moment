import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
const Card = ({
  imgUrl,
  title,
  description,
  searchCode,
}: {
  imgUrl: string;
  title: string;
  description: string;
  searchCode: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className=" dark:bg-dark-card dark:hover:border-white hover:border bg-slate-300 hover:border-black  flex flex-col items-center rounded-lg ">
      <img className="rounded-md" src={imgUrl} alt="img1" />
      <div className="md:px-10 md:pb-10 md:pt-3 px-5 pb-5 pt-2">
        <p className="sm:text-2xl text-xl font-semibold font-inter">{title}</p>
        <p className="mt-2 sm:text-lg text-sm">{description}</p>
        <Button
          variant={"neon"}
          className="ml-4 hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black mt-10 w-lg "
          onClick={() => navigate(`/roadmaps/${searchCode.toLowerCase()}`)}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Card;
