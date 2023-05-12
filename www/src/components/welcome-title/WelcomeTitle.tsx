import { FC } from "react";
import "./WelcomeTitle.scss";

const WelcomeTitle: FC = () => {
  return (
    <h1 className="welcome--title">
      Welcome, <br />
      Track your trainings
      <br />
      today!
    </h1>
  );
};

export default WelcomeTitle;
