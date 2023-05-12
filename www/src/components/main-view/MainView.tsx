import { FC } from "react";
import "./MainView.scss";
import { MainViewProperties } from "../../interfaces/main-view-properties";
import Title from "../title/Title";

const MainView: FC<MainViewProperties> = (props) => {
  return (
    <>
      <div className="container">
        <Title title={props.title} size={36}></Title>
        <div className="center-grid">{props.children}</div>
      </div>
    </>
  );
};

export default MainView;
