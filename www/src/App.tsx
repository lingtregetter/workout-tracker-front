import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Header from "./components/header/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage></WelcomePage>,
  },
]);

function App() {
  return (
    <>
      <Header></Header>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
