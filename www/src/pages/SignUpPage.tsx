import { FC, FormEvent, useState } from "react";
import RegisterForm from "../components/forms/register-form/RegisterForm";
import MainView from "../components/main-view/MainView";
import { useAuth } from "../stores/auth-context";
import { register } from "../services/auth.service";

const SignUpPage: FC = () => {
  const auth = useAuth();
  const [error, setError] = useState(false);
  const [userEmail, setUserEmail] = useState<string>();

  const onSubmit = async (
    event: FormEvent<HTMLFormElement>,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    try {
      setUserEmail(email);
      await register(auth, firstName, lastName, email, password);
    } catch (e) {
      console.log("ERROR: ", e);
      setError(true);
    }
  };

  return (
    <>
      <MainView title={"Sign up"}>
        {error && (
          <p style={{ color: "#edafb8", fontWeight: "bold" }}>
            User with email {userEmail} is already registered
          </p>
        )}
        <RegisterForm
          onSubmit={async (event, firstName, lastName, email, password) => {
            onSubmit(event, firstName, lastName, email, password);
          }}
        ></RegisterForm>
      </MainView>
    </>
  );
};

export default SignUpPage;
