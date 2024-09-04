import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "@/components/card";
import { useRef } from "react";
const LandingPage = () => {
  const myRef = useRef<HTMLElement | null>(null);
  const cardContents = [
    {
      imgUrl: "../../dsa.jpeg",
      title: "DSA Mastery",
      searchCode:"dsa-mastery",
      description:
        "Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets.",
    },
    {
      imgUrl: "../../web.jpeg",
      title: "Web Development Mastery",
      searchCode:"web-dev-mastery",
      description:
        "Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets.",
    },
    {
      imgUrl: "../../mobile.jpg",
      title: "App Development Mastery",
      searchCode:"app-dev-mastery",
      description:
        "Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets.",
    },
    {
      imgUrl: "../../mL.jpg",
      title: "Machine Learning Mastery",
      searchCode:"ml-mastery",
      description:
        "Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets.",
    },
    {
      imgUrl: "../../dataScience.jpg",
      title: "Data Science Mastery",
      searchCode:"app-dev-mastery",
      description:
        "Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets.",
    },
    {
      imgUrl: "../../aws.png",
      title: "AWS Mastery",
      searchCode:"aws-mastery",
      description:
        "Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets.",
    },
    {
      imgUrl: "",
      title: "Data Science Mastery",
      searchCode:"app-dev-mastery",
      description:
        "Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets.",
    },
    {
      imgUrl: "",
      title: "Data Science Mastery",
      searchCode:"app-dev-mastery",
      description:
        "Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets.",
    },
    {
      imgUrl: "",
      title: "Data Science Mastery",
      searchCode:"app-dev-mastery",
      description:
        "Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets.",
    },
  ];

  return (
    <div className=" relative dark:bg-dark-new bg-white h-full w-full">
      <div className=" absolute inset-0  bg-[url('/src/assets/my-durves-vector.svg')] bg-repeat-y  bg-center opacity-20 "></div>
      <div className="relative z-10">
        <Navbar />
        <div>
          <div className="mt-20 ml-10 w-2/3">
            <div>
              <p className="text-3xl font-bold text-align-left ml-4 mt-4 font-inter sm:text-6xl sm:text-wrap">
                Transform Your{" "}
                <span className="text-sky-400">Computer Science </span>Career
                with Expert Courses and Tools{" "}
              </p>
            </div>
            <div className="mt-10">
              <p className="text-xl font-light text-align-left ml-4 mt-4 font-satoshi sm:text-wrap">
                {" "}
                Discover curated learning paths, track your progress, and
                achieve your career goals with ease
              </p>
            </div>
            <Button
              variant={"neon"}
              className="ml-4 hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black mt-10 w-lg "
              onClick={() => {
                myRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </Button>
          </div>
          <div className="w-full">
            <img
              src="/src/assets/hero_bg_cropped.png"
              className="w-full h-auto object-cover"
              alt="hero.png"
            />
          </div>
          <div>
            <p className="sm:text-6xl text-3xl mt-20 font-inter font-semibold text-center">
              Featured Courses
            </p>
            <div ref={myRef as React.RefObject<HTMLDivElement>}>
              <div  className="grid-cols-3 gap-10 mx-36 mt-20  hidden xl:grid">
                {cardContents.map((card, index) => {
                  return (
                    <Card
                      key={index}
                      imgUrl={card.imgUrl}
                      title={card.title}
                      description={card.description}
                      searchCode={card.searchCode}
                    />
                  );
                })}
              </div>
              <div ref={myRef as React.RefObject<HTMLDivElement>} className="xl:hidden mx-12 mt-10">
                <Carousel>
                  <CarouselContent>
                    {cardContents.map((card, index) => {
                      return (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/2 lg:basis-1/3"
                        >
                          <Card
                            key={index}
                            imgUrl={card.imgUrl}
                            title={card.title}
                            description={card.description}
                            searchCode={card.searchCode}
                          />
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div className="hidden lg:block">
                <p className="sm:text-6xl text-3xl mt-20 font-inter font-semibold text-center">
                  How it works
                </p>
                <div className="flex justify-between items-center mx-36 mt-20">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-24 h-24 rounded-full border-white border-2 dark:bg-dark-circle bg-slate-300 flex items-center justify-center">
                      <p className="text-2xl">1</p>
                    </div>
                    <p className="text-2xl font-semibold  font-inter text-center ">
                      Browse Courses
                    </p>
                  </div>

                  <div className="h-0.5 dark:bg-white bg-black w-20 mb-12"></div>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-24 h-24 rounded-full border-white border-2 dark:bg-dark-circle bg-slate-300 flex items-center justify-center">
                      <p className="text-2xl">2</p>
                    </div>
                    <p className="text-2xl font-semibold font-inter text-center ">
                      Enroll & Learn
                    </p>
                  </div>

                  <div className="h-0.5 dark:bg-white bg-black w-20 mb-12"></div>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-24 h-24 rounded-full border-white border-2 dark:bg-dark-circle bg-slate-300 flex items-center justify-center">
                      <p className="text-2xl">3</p>
                    </div>
                    <p className="text-2xl font-semibold font-inter text-center ">
                      Track Progress
                    </p>
                  </div>

                  <div className="h-0.5 dark:bg-white bg-black w-20 mb-12"></div>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-24 h-24 rounded-full border-white border-2 dark:bg-dark-circle bg-slate-300 flex items-center justify-center">
                      <p className="text-2xl">4</p>
                    </div>
                    <p className="text-2xl font-semibold font-inter text-center ">
                      Collab
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;
