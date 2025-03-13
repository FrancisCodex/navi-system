import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import Loading from "@/components/loading";

interface PrivateRouteProps {
  element: React.ReactElement;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    console.log("User not found, redirecting to /");
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log("Unauthorized, redirecting...");
    return <Navigate to={user.role === "incubatee" ? "/incubatees" : "/dashboard"} state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;