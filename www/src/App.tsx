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
import { AuthProvider } from "./stores/auth-context";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <AuthProvider>
          <Header></Header>
          <Routes>
            <Route path={"/"} element={<WelcomePage />}></Route>
            <Route path={"/sign-in"} element={<SignInPage />}></Route>
            <Route path={"/sign-up"} element={<SignUpPage />}></Route>
            <Route
              path={"/user/details"}
              element={
                <ProtectedRoute>
                  <UserDetailsPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={"/programs"}
              element={
                <ProtectedRoute>
                  <MyProgramsPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={"/programs/create"}
              element={
                <ProtectedRoute>
                  <CreateProgramPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={"/programs/details/:programId"}
              element={
                <ProtectedRoute>
                  <ProgramViewPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={"/training-block/details/:blockId"}
              element={
                <ProtectedRoute>
                  <TrainingBlockViewPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={"/workout/details/:workoutId"}
              element={
                <ProtectedRoute>
                  <WorkoutViewPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={"/workout/create"}
              element={
                <ProtectedRoute>
                  <CreateWorkoutPage />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
