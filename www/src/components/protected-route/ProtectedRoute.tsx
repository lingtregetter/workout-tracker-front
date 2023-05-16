import { useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/auth-context";
import { FC, ReactNode, useEffect } from "react";

const ProtectedRoute: FC<{ children: ReactNode }> = (props) => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/sign-in");
    }
  }, []);

  return <>{props.children}</>;
};

export default ProtectedRoute;
