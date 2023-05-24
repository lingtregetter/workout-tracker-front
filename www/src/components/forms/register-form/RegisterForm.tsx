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
  // validation
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const containsOnlySpacesOrTabs = (inputString: string) => {
    const pattern: RegExp = /^[ \t]+$/;
    return pattern.test(inputString);
  };

  const containsAnyNumbers = (inputString: string) => {
    const pattern: RegExp = /\d/;
    return pattern.test(inputString);
  };

  const containsAnySymbols = (inputString: string) => {
    const pattern: RegExp = /[.!@#$%^&*()<>?/\|{}[\]'"~=+-]/;
    return pattern.test(inputString);
  };

  const isFirstNameInvalid =
    !firstName || firstName.length === 0 || containsOnlySpacesOrTabs(firstName);
  const isLastNameInvalid =
    !lastName || lastName.length === 0 || containsOnlySpacesOrTabs(lastName);
  const isEmailInvalid =
    !email ||
    email.length === 0 ||
    containsOnlySpacesOrTabs(email) ||
    email.length < 5 ||
    !email.includes("@") ||
    !email.includes(".");
  const isPasswordInvalid =
    !password ||
    password.length < 9 ||
    containsOnlySpacesOrTabs(password) ||
    !containsAnyNumbers(password) ||
    !containsAnySymbols(password);
  const isConfirmPasswordInvalid =
    !confirmPassword || confirmPassword !== password;

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
      {isFormInvalid && isFirstNameInvalid && (
        <p className="invalid-message">* Please add a first name</p>
      )}
      <input
        type="text"
        name="firstName"
        required
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <label htmlFor="lastName">Last name</label>
      {isFormInvalid && isLastNameInvalid && (
        <p className="invalid-message">* Please add a last name</p>
      )}
      <input
        type="text"
        name="lastName"
        required
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      <label htmlFor="email">Email</label>
      {isFormInvalid && isEmailInvalid && (
        <p className="invalid-message">* Please add a valid email</p>
      )}
      <input
        type="email"
        name="email"
        required
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label htmlFor="password">Password</label>
      {isFormInvalid && isPasswordInvalid && (
        <p className="invalid-message">* Please add valid password</p>
      )}
      <input
        type="password"
        name="password"
        required
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <label htmlFor="confirm-password">Confirm password</label>
      {isFormInvalid && isConfirmPasswordInvalid && (
        <p className="invalid-message">* Please repeat password</p>
      )}
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
        onClick={() => {
          if (isFirstNameInvalid || isLastNameInvalid || isEmailInvalid || isPasswordInvalid) {
            if (!isFormInvalid) setIsFormInvalid((value) => !value);
            return;
          }
        }}
        type={"outlined"}
        btnType="submit"
      ></Button>
    </form>
  );
};

export default RegisterForm;
