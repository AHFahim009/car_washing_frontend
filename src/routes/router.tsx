import Login from "@/components/authPages/login/Login";
import HomeLayout from "@/components/layouts/HomeLayout";
import Booking from "@/components/pages/booking/Booking";
import Home from "@/components/pages/home/Home";
import ServiceDetails from "@/components/pages/serviceDetails/ServicesDetails";
import { createBrowserRouter } from "react-router-dom";
import OurServices from "../components/pages/ourServices/OurServices";
import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import ServiceManagement from "@/components/adminPages/serviceManagement/ServiceManagement";
import SlotManagement from "@/components/adminPages/slotManagement/SlotManagement";
import UserManagement from "@/components/adminPages/userManagemnet/UserManagement";
import PaymentCallback from "@/components/pages/pamentInfo/PaymentCallback";
import UserActivities from "@/components/userPages/UserActivities";
import Register from "@/components/authPages/register/Register";
import PrivateRoutes from "./privateRoutes";
import AllReview from "@/components/pages/AllReview/AllReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "serviceDetails/:serviceId",
        element:

          <ServiceDetails />,
      },
      {
        path: "booking/:serviceId",
        element: <Booking />,
      },
      {
        path: "services",
        element: <OurServices />,
      },
      {
        path: "/allReview",
        element: <AllReview />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/payment-callback",
    element: <PaymentCallback />,
  },
  // dashboard
  {
    path: "/admin-dashboard",
    element: (
      <PrivateRoutes requiredRole={["admin"]}>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "servicesManagement",
        element: <ServiceManagement />,
      },
      {
        path: "slotManagement",
        element: <SlotManagement />,
      },
      {
        path: "userManagement",
        element: <UserManagement />,
      },
    ],
  },
  // dashboard - user
  {
    path: "/user-dashboard",
    element: (
      <PrivateRoutes requiredRole={["user"]}>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "userActivities",
        element: <UserActivities />,
      },
    ],
  },
]);
export default router;
