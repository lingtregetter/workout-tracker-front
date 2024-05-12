import { AuthContext } from "../stores/auth-context";

const register = async (
  auth: AuthContext,
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  await auth.register(firstName, lastName, email, password);
};

const logIn = async (auth: AuthContext, email: string, password: string) => {
  await auth.logIn(email, password);
};

export { register, logIn };
