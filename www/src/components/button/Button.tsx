import { ButtonProperties } from "../../interfaces/button-properties";
import "./Button.scss";

const Button: React.FC<ButtonProperties> = (props) => {
  const btnType = props.btnType ?? "button";

  return (
    <button
      className={`btn btn-${props.type}`}
      style={props.style}
      onClick={() => props.onClick()}
      type={btnType}
    >
      {props.text}
    </button>
  );
};

export default Button;
