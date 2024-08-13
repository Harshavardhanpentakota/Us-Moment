
const Footer = () => {
  return (
    <div className="mt-32 ">
      <div className="h-0.5 bg-white w-full mb-12"></div>
      <div className=" grid grid-cols-12">
        <div className="col-span-3 ml-20">
          <p className="text-3xl font-inter font-semibold">UsMoment</p>
          <p className="mt-10 text-sm font-inter font-normal text-wrap">
          Discover awesome learning paths, track your epic progress, and smash your career goals with style!
          </p>
        </div>
        <div className="col-span-9 flex">
          <div></div>
          <div className="ml-10"> 
            <p className="text-md font-inter font-semibold" >Company</p>
            <ul className="font-normal mt-5 mb-20">
              <li className="mt-2">About</li>
              <li className="mt-2">Contact us</li>
              <li className="mt-2">Terms & Conditions</li>
              <li className="mt-2">Pricing</li>
            </ul>
          </div>
          <div className="ml-10">
            <p className="text-md font-inter font-semibold">Quick Access</p>
            <ul className="font-normal mt-5 mb-20">
              <li className="mt-2">Data Structures & Algorithms</li>
              <li className="mt-2">Web Development</li>
              <li className="mt-2">Data Science</li>
              <li className="mt-2">Machine Learning</li>
              <li className="mt-2">App Development</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-white w-full mb-12"></div>
    </div>
  )
}

export default Footer