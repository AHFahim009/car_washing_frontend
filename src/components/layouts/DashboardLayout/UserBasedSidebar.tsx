import { useAppSelector } from "@/redux/hooks";
import AdminSidebar from "./sidebar/AdminSidebar";
import UserSidebar from "./sidebar/UserSideBar";



const UserBasedSidebar = () => {
  const userRole: string = useAppSelector((state) => state.auth.credentials.role)
  let renderSidebar;

  switch (userRole) {
    case "admin":
      renderSidebar = <AdminSidebar />;
      break;
    case "user":
      renderSidebar = <UserSidebar />
      break;
    default:
      renderSidebar = null; // Render nothing or a fallback UI if role doesn't match
      break;
  }

  return <>{renderSidebar}</>;
};

export default UserBasedSidebar;
