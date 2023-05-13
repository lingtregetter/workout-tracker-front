import { FC } from "react";
import "./OverviewRow.scss";
import { OverviewRowProperties } from "../../interfaces/overview-row-properties";

const OverviewRow: FC<OverviewRowProperties> = (props) => {
  return (
    <div className="box">
      <h1 className="box-title">{props.title}</h1>
      <div className="lamp-kast"></div>
    </div>
  );
};

export default OverviewRow;
