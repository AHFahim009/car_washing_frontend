import { Outlet } from "react-router-dom"
import Navbar from "../shared/Navbar/Navbar"
import Footer from "../shared/footer/Footer"

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />

    </>
  )
}
export default HomeLayout