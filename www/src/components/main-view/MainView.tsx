import { FC } from "react";
import "./MainView.scss";
import { MainViewProperties } from "../../interfaces/main-view-properties";

const MainView: FC<MainViewProperties> = (props) => {
  return (
    <>
      <div className="container">
        <h1 className="title">{props.title}</h1>
        {props.children}
      </div>
    </>
  );
};

export default MainView;
