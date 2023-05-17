import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import httpClient from "../services/http-client";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContext {
  userId?: string;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider: FC<AuthProviderProps> = (props) => {
  const [userId, setUserId] = useState<string | undefined>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    setUserIdOnLoad(accessToken);
  }, []);

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const response = await httpClient(false).post<{
      jwt: string;
      refreshToken: string;
    }>("v1/identity/Account/Register", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    localStorage.setItem("access-token", response.data.jwt);
    setUserIdOnLoad(response.data.jwt);
  };

  const logIn = async (email: string, password: string) => {
    const response = await httpClient(false).post<{
      jwt: string;
      refreshToken: string;
    }>("/v1/identity/Account/LogIn", {
      email: email,
      password: password,
    });

    localStorage.setItem("access-token", response.data.jwt);
    setUserIdOnLoad(response.data.jwt);
  };

  const logOut = () => {
    localStorage.removeItem("access-token");
    setUserId(undefined);
  };

  const setUserIdOnLoad = (token?: string | null) => {
    if (!token) return;
    const pathname = location.pathname;
    const decodedJwt = jwt_decode(token) as Object;

    // TODO: expires check
    Object.entries(decodedJwt).forEach(([key, value]) => {
      if (key.includes("nameidentifier")) {
        setUserId(value);
        if (["/sign-in", "/sign-up", "/"].includes(pathname)) {
          navigate("/programs");
          return;
        }
        navigate(pathname);
      }
    });
  };

  const authContextValue: AuthContext = {
    userId,
    register,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
