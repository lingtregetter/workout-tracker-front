import { CSSProperties, FC } from "react";

export interface DeleteBtnProperties {
  readonly onClick: Function;
  readonly style?: CSSProperties;
  readonly fill?: string;
}

const DeleteButton: FC<DeleteBtnProperties> = (props) => {
  return (
    <>
      <svg
        style={props.style}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        onClick={() => {
          props.onClick();
        }}
      >
        <path
          fill={props.fill}
          d="m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570Zm-438 0v570-570Z"
        />
      </svg>
    </>
  );
};

export default DeleteButton;
