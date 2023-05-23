import { FC } from "react";
import "./OverviewRow.scss";
import { OverviewRowProperties } from "../../interfaces/overview-row-properties";
import ForwardButton from "../svg/ForwardButton";
import AddButton from "../svg/AddButton";

const OverviewRow: FC<OverviewRowProperties> = (props) => {
  const isAddButtonVisible = props.isAddBtnVisible ?? true;
  const isArrowButtonVisible = props.isArrowBtnVisible ?? true;

  return (
    <>
      <div className="overview">
        <div className="box">
          <h1 className="box-title">{props.title}</h1>
          <div className="icons">
            {isAddButtonVisible && (
              <div title={props.hoverTitle}>
                <AddButton
                  onClick={() => {
                    props.onAddClick();
                  }}
                ></AddButton>
              </div>
            )}

            {isArrowButtonVisible && (
              <>
                <ForwardButton
                  onClick={() => {
                    props.onArrowClick();
                  }}
                ></ForwardButton>
              </>
            )}
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default OverviewRow;
