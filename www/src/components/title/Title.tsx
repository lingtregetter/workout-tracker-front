import { FC } from "react";
import "./Title.scss";
import { TitleProperties } from "../../interfaces/title-properties";

const Title: FC<TitleProperties> = (props) => {
  return (
    <>
      <h1 className={`title title-${props.size}`}>{props.title}</h1>
    </>
  );
};

export default Title;
