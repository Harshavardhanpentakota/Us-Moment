const Footer = () => {
  return (
    <div className=" mt-10 pt-20 bg-neon-button  ">
      <div className=" md:grid md:grid-cols-12 flex flex-col gap-10">
        <div className="md:col-span-4 flex flex-col md:ml-20 mx-10">
          <p className="text-3xl font-inter font-bold md:text-left text-center items-center md:items-center">
            UsMoment
          </p>
          <p className="md:mt-10 mt-5 text-sm font-inter font-normal text-wrap text-center md:text-left">
            Discover awesome learning paths, track your epic progress, and smash
            your career goals with style!
          </p>
        </div>
        <div className="col-span-6 flex">
          <div></div>
          <div className="ml-10">
            <p className="text-md font-inter font-bold ">Company</p>
            <ul className="font-normal mt-5 mb-20">
              <li className="mt-2">About</li>
              <li className="mt-2">Contact us</li>
              <li className="mt-2">Terms & Conditions</li>
              <li className="mt-2">Pricing</li>
            </ul>
          </div>
          <div className="ml-10">
            <p className="text-md font-inter font-bold">Quick Access</p>
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
    </div>
  );
};

export default Footer;
