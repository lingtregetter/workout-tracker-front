import { ButtonProperties } from "../../interfaces/button-properties";
import "./Button.scss";

const Button: React.FC<ButtonProperties> = (props) => {
  return (
    <button className={`btn btn-${props.type}`} onClick={() => props.onClick()}>
      {props.text}
    </button>
  );
};

export default Button;
