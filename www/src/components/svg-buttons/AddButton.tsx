import { FC } from "react";

export interface AddBtnProperties {
  readonly onClick: Function;
}

const AddButton: FC<AddBtnProperties> = (props) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="26"
        viewBox="0 96 960 960"
        width="26"
        onClick={() => {
          props.onClick();
        }}
      >
        <path d="M180 936q-24.75 0-42.375-17.625T120 876V276q0-24.75 17.625-42.375T180 216h600q24.75 0 42.375 17.625T840 276v329q-14-8-29.5-13t-30.5-8V276H180v600h309q4 16 9.023 31.172Q503.045 922.345 510 936H180Zm0-107v47-600 308-4 249Zm100-53h211q4-16 9-31t13-29H280v60Zm0-170h344q14-7 27-11.5t29-8.5v-40H280v60Zm0-170h400v-60H280v60Zm452.5 579q-77.5 0-132.5-55.5T545 828q0-78.435 54.99-133.718Q654.98 639 733 639q77 0 132.5 55.282Q921 749.565 921 828q0 76-55.5 131.5t-133 55.5ZM718 955h33V845h110v-33H751V702h-33v110H608v33h110v110Z" />
      </svg>
    </>
  );
};

export default AddButton;
