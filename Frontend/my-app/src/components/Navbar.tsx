import { ClerkLoaded,useAuth,UserButton} from "@clerk/clerk-react"
import { Button } from "../components/ui/button"

const Navbar = () => {
    const {isSignedIn} = useAuth();
  return (
    <div className="border-b relative py-3 bg-black">
      <div className="h-14 container flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <a href="/home"><p className="text-3xl font-bold font-montserrat">Us Moment</p></a>
         
        </div>
        <div className="flex items-center gap-4">
          {/* <ModeToggle /> */}
          {!isSignedIn ? (
            <Button  asChild>
              <a href="/signin"  >Sign in</a>
            </Button>
          ):(
            <>
              <Button variant="link" >
                <a href="/dashboard" className='font-montserrat font-semibold' >Dashboard</a>
              </Button>
              <ClerkLoaded>
              <UserButton/>
              </ClerkLoaded>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar