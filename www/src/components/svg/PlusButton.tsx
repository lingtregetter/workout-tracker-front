import { FC } from "react";

export interface PlusBtnProperties {
  readonly onClick: Function;
  readonly fill?: string;
}

const PlusButton: FC<PlusBtnProperties> = (props) => {
  return (
    <>
      <svg
        style={{ display: "block", margin: "0 auto 10px", cursor: "pointer" }}
        id="add-btn"
        xmlns="http://www.w3.org/2000/svg"
        height="30"
        viewBox="0 96 960 960"
        width="30"
        onClick={() => {
          props.onClick();
        }}
      >
        <path
          fill={props.fill}
          d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
        />
      </svg>
    </>
  );
};

export default PlusButton;
