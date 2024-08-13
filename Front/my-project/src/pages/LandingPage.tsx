import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { MagicCard } from "@/components/magicui/magic-card"
import { Carousel,CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious, } from "@/components/ui/carousel"
const LandingPage = () => {

  const cardContents = [{
    "imgUrl":"",
    "title":"DSA Mastery",
    "description":"Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets."
  },{
    "imgUrl":"",
    "title":"Data Science Mastery",
    "description":"Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets."
  },
  {
    "imgUrl":"",
    "title":"Data Science Mastery",
    "description":"Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets."
  },
  {
    "imgUrl":"",
    "title":"Data Science Mastery",
    "description":"Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets."
  },
  {
    "imgUrl":"",
    "title":"Data Science Mastery",
    "description":"Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets."
  },
  {
    "imgUrl":"",
    "title":"Data Science Mastery",
    "description":"Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets."
  },
  {
    "imgUrl":"",
    "title":"Data Science Mastery",
    "description":"Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets."
  },
  {
    "imgUrl":"",
    "title":"Data Science Mastery",
    "description":"Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets."
  },
  {
    "imgUrl":"",
    "title":"Data Science Mastery",
    "description":"Learn data analysis, machine learning, and statistical modeling using Python and R. Gain practical skills through hands-on projects and real datasets."
  }
]

  return (
    <div className=" relative dark:bg-dark-new bg-white h-full w-full">
    <div className=" absolute inset-0  bg-[url('/src/assets/my-durves-vector.svg')] bg-repeat-y  bg-center opacity-20 "></div>
    <div className="relative z-10">
      <Navbar/>
      <div>
      <div className="mt-20 ml-10 w-2/3">
        <div>
        <p className="text-4xl font-bold text-align-left ml-4 mt-4 font-inter sm:text-6xl sm:text-wrap">Transform Your <span className="text-sky-400">Computer Science </span>Career with Expert Courses and Tools </p>
        </div>
        <div className="mt-10">
          <p className="text-2xl font-light text-align-left ml-4 mt-4 font-satoshi sm:text-wrap"> Discover curated learning paths, track your progress, and achieve your career goals with ease</p>
        </div>
        <Button variant={"neon"}  className="ml-4 hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black mt-10 w-lg ">Get Started</Button>
      </div>
      <div className="w-full">
        <img src="/src/assets/hero_bg_cropped.png" className="w-full h-auto object-cover" alt="hero.png" />
      </div>
      <div>
        <p className="sm:text-5xl text-3xl mt-20 font-inter font-semibold text-center" >Featured Courses</p>
        <div>
          <div className="grid grid-cols-3 gap-7 mx-36 mt-20  hidden lg:grid">
            {
              cardContents.map((card) => {
                return (
                  <MagicCard>
                    <div className="p-10">
                      <img src="${card.imgUrl}" alt="img1" />
                      <p className="text-2xl font-semibold font-inter">{card.title}</p>
                      <p className="mt-2">{card.description}</p> 
                      <Button variant={"neon"} className="ml-4 hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black mt-10 w-lg ">Get Started</Button>
                    </div>
                  </MagicCard>
                )
              })
            }
          </div>
          <div className="lg:hidden mx-20 mt-10">
            <Carousel>
              <CarouselContent>
                {
                  cardContents.map((card) => {
                    return (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                          <MagicCard>
                        <div className="p-10">
                          <img src="${card.imgUrl}" alt="img1" />
                          <p className="sm:text-2xl text-xl font-semibold font-inter">{card.title}</p>
                          <p className="mt-2 sm:text-lg text-sm">{card.description}</p> 
                          <Button variant={"neon"} className="ml-4 hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black text-black mt-10 w-lg ">Get Started</Button>
                        </div>
                        </MagicCard>
                        </CarouselItem>
                    )
                  })
                }
              </CarouselContent>
              <CarouselPrevious />
  <CarouselNext />

            </Carousel>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
     </div>
    </div>
  )
}

export default LandingPage