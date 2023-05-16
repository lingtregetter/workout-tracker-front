import { FC, FormEvent } from "react";
import RegisterForm from "../components/register-form/RegisterForm";
import MainView from "../components/main-view/MainView";
import { useAuth } from "../stores/auth-context";

const SignUpPage: FC = () => {
  const auth = useAuth();

  const onSubmit = async (
    event: FormEvent<HTMLFormElement>,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    try {
      await auth.register(firstName, lastName, email, password);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  return (
    <>
      <MainView title={"Sign up"}>
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
