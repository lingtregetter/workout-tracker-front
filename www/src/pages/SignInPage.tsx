import { FC, FormEvent, useState } from "react";
import MainView from "../components/main-view/MainView";
import LoginForm from "../components/forms/login-form/LoginForm";
import { useAuth } from "../stores/auth-context";
import { logIn } from "../services/auth.service";

const SignInPage: FC = () => {
  const auth = useAuth();
  const [error, setError] = useState(false);

  const onSubmit = async (
    event: FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    try {
      await logIn(auth, email, password);
    } catch (e) {
      console.log("ERROR: ", e);
      setError(true);
    }
  };

  return (
    <>
      <MainView title={"Sign in"}>
        {error && (
          <p style={{ color: "#edafb8", fontWeight: "bold" }}>
            Invalid credentials
          </p>
        )}
        <LoginForm
          onSubmit={async (event, email, password) => {
            onSubmit(event, email, password);
          }}
        ></LoginForm>
      </MainView>
    </>
  );
};

export default SignInPage;
