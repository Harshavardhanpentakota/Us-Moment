import Sidebar from "@/components/Sidebar";
import { useState } from "react";
const Dashboard = () => {
  const [sideBarView, setsideBarView] = useState(false);
  return (
    <div className="bg-neon-button h-screen flex flex-row">
      <Sidebar pageName="dashboard" toggleSideBar = {sideBarView} setToggleSideBar = {setsideBarView}/>
      <div> 
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
    </div>
  );
};

export default Dashboard;
