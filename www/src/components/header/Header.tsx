import { FC } from "react";
import "./Header.scss";
import Button from "../button/Button";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className="header">
      <Link to={"/sign-in"}>
        <Button onClick={() => {}} text={"Sign in"} type={"secondary"}></Button>
      </Link>
      <Link to={"/sign-up"}>
        <Button onClick={() => {}} text={"Sign up"} type={"primary"}></Button>
      </Link>
    </header>
  );
};

export default Header;
