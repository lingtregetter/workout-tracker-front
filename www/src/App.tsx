import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Header from "./components/header/Header";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <Header></Header>
        <Routes>
          <Route path={"/"} element={<WelcomePage />}></Route>
          <Route path={"/sign-in"} element={<SignInPage />}></Route>
          <Route path={"/sign-up"} element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
