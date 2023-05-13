import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Header from "./components/header/Header";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import MyProgramsPage from "./pages/MyProgramsPage";
import CreateProgramPage from "./pages/CreateProgramPage";
import ProgramViewPage from "./pages/ProgramViewPage";
import TrainingBlockViewPage from "./pages/TrainingBlockViewPage";
import WorkoutViewPage from "./pages/WorkoutViewPage";
import CreateWorkoutPage from "./pages/CreateWorkoutPage";

function App() {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <Header></Header>
        <Routes>
          <Route path={"/"} element={<WelcomePage />}></Route>
          <Route path={"/sign-in"} element={<SignInPage />}></Route>
          <Route path={"/sign-up"} element={<SignUpPage />}></Route>
          <Route path={"/user/details"} element={<UserDetailsPage />}></Route>
          <Route path={"/programs"} element={<MyProgramsPage />}></Route>
          <Route
            path={"/programs/create"}
            element={<CreateProgramPage />}
          ></Route>
          <Route
            path={"/programs/details/:programId"}
            element={<ProgramViewPage />}
          ></Route>
          <Route
            path={"/training-block/details/:blockId"}
            element={<TrainingBlockViewPage />}
          ></Route>
          <Route
            path={"/workout/details"}
            element={<WorkoutViewPage />}
          ></Route>
          <Route
            path={"/workout/create"}
            element={<CreateWorkoutPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
