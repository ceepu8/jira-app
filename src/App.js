import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./pages/log-in/log-in.form";
import { UserRegisterLoginTemplate } from "./templates/user-register-login.template";
import { RegisterForm } from "./pages/register/register.form";
import { MainTemplate } from "./templates/main-template/main.template";
import { CreateProjectForm } from "./components/create-project-form/create-project.form";
import { HomePage } from "./pages/home/home.pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<MainTemplate Element={HomePage} />} />
        <Route
          index
          path="/project"
          element={<MainTemplate Element={HomePage} />}
        />
        <Route
          index
          path="/create-project"
          element={<MainTemplate Element={CreateProjectForm} />}
        />

        <Route
          index
          path="/login"
          element={<UserRegisterLoginTemplate Element={LoginForm} />}
        />
        <Route
          path="/register"
          element={<UserRegisterLoginTemplate Element={RegisterForm} />}
        />
      </Routes>
    </div>
  );
}

export default App;
