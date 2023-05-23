import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/auth-context";
import { FC, ReactNode, useEffect } from "react";

const ProtectedRoute: FC<{ children: ReactNode }> = (props) => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (!userId) {
      navigate("/sign-in");
    } else if (["/sign-in", "/sign-up", "/"].includes(pathname) && userId) {
      navigate("/programs");
      return;
    }
  }, []);

  return <>{props.children}</>;
};

export default ProtectedRoute;
