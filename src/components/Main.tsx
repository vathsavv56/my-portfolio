import Navbar from "./Navbar"
import { Outlet } from "react-router"

const Main = () => {
  return (
    <div className="h-fit w-full">
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default Main