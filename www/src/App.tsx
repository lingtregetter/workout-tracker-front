import "./App.scss";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <Header></Header>
        <Routes>
          <Route path={"/"} element={<WelcomePage></WelcomePage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
