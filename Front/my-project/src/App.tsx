import "./index.css"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from "@/components/ui/theme-provider"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/> ,
  },
  {
    path:"/home",
    element:<Home/>
  },
  {
    path:"/signin",
    element:<Signin/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  }
])
function App() {
 return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <div className="App">
      <RouterProvider router={router} />
      </div>
  </ThemeProvider>

 )
}

export default App
