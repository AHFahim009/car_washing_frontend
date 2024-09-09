import { useNavigate, useLocation } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

type TProps = {
  children: ReactNode;
  requiredRole: string[]; // Specify the required roles for accessing the route
};

const PrivateRoutes = ({ children, requiredRole }: TProps) => {
  const navigate = useNavigate();
  const userRole = useAppSelector((state) => state.auth.credentials.role);

  useEffect(() => {
    // Check if userRole is defined and if it matches any of the required roles
    if (!userRole) {
      navigate("/", { replace: true });
    } else if (!requiredRole.includes(userRole)) {
      navigate("/", { replace: true });
    }
  }, [userRole, navigate, requiredRole]);

  // Render children if authorized
  return <>{children}</>;
};

export default PrivateRoutes;
