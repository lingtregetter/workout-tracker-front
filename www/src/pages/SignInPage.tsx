import { FC, FormEvent } from "react";
import MainView from "../components/main-view/MainView";
import LoginForm from "../components/forms/login-form/LoginForm";
import { useAuth } from "../stores/auth-context";

const SignInPage: FC = () => {
  const auth = useAuth();

  const onSubmit = async (
    event: FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    try {
      await auth.logIn(email, password);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  return (
    <>
      <MainView title={"Sign in"}>
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
