import { FC } from "react";
import "./Header.scss";
import Button from "../button/Button";

const Header: FC = () => {
  return (
    <header className="header">
      <Button
        onClick={() => {
          console.log("sign in");
        }}
        text={"Sign in"}
        type={"secondary"}
      ></Button>
      <Button
        onClick={() => {
          console.log("sign up");
        }}
        text={"Sign up"}
        type={"primary"}
      ></Button>
    </header>
  );
};

export default Header;
