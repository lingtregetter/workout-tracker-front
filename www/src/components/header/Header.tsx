import { FC } from "react";
import "./Header.scss";
import Button from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/auth-context";

const Header: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    auth.logOut();
    navigate("/sign-in");
  };

  return (
    <header className="header">
      {auth.userId ? (
        <>
          <Link to={"/user/details"}>
            <Button
              onClick={() => {}}
              text={"User Details"}
              type={"secondary"}
            ></Button>
          </Link>
          <Button onClick={logOut} text={"Sign out"} type={"primary"}></Button>
        </>
      ) : (
        <>
          <Link to={"/sign-in"}>
            <Button
              onClick={() => {}}
              text={"Sign in"}
              type={"secondary"}
            ></Button>
          </Link>
          <Link to={"/sign-up"}>
            <Button
              onClick={() => {}}
              text={"Sign up"}
              type={"primary"}
            ></Button>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
