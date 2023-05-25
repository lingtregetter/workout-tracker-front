import { FC, useState } from "react";
import "./LoginForm.scss";
import Button from "../../button/Button";
import { LoginFormProperties } from "../../../interfaces/form-properties/login-form-properties";

const LoginForm: FC<LoginFormProperties> = (props) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <form
      className="login-form"
      onSubmit={(event) => {
        props.onSubmit(event, email!, password!);
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        required
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        required
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button
        style={{ margin: "0 auto" }}
        text={"Sign in"}
        onClick={() => {}}
        type={"outlined"}
        btnType="submit"
      ></Button>
    </form>
  );
};

export default LoginForm;
