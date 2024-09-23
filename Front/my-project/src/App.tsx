import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import RoadMapPage from "./pages/RoadMapPage";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ErrorBoundary from "./pages/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";
import Saved from "./pages/Saved";
import Blogs from "./pages/Blogs";
import Profile from "./pages/Profile";
import ShowProfile from "./pages/ShowProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ErrorBoundary>
        <Router>
          <div className="App ">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userName" element={<ShowProfile />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/roadmaps/:roadMapName" element={<RoadMapPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
