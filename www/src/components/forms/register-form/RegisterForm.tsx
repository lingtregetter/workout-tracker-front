import { FC, useState } from "react";
import "./RegisterForm.scss";
import Button from "../../button/Button";
import { RegisterFormProperties } from "../../../interfaces/register-form-properties";

const RegisterForm: FC<RegisterFormProperties> = (props) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  return (
    <form
      className="register-form"
      onSubmit={(event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
          console.log("no match");
          return;
        }

        props.onSubmit(event, firstName!, lastName!, email!, password!);
      }}
    >
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        required
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        name="lastName"
        required
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
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
      <label htmlFor="confirm-password">Confirm password</label>
      <input
        type="password"
        name="confirm-password"
        required
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
      />
      <Button
        text={"Sign up"}
        onClick={() => {}}
        type={"outlined"}
        btnType="submit"
      ></Button>
    </form>
  );
};

export default RegisterForm;
