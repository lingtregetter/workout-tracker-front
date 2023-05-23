import { FC } from "react";

export interface ForwardBtnProperties {
  readonly onClick: Function;
}

const ForwardButton: FC<ForwardBtnProperties> = (props) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 96 960 960"
        width="24"
        onClick={() => {
          props.onClick();
        }}
      >
        <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
      </svg>
    </>
  );
};

export default ForwardButton;
