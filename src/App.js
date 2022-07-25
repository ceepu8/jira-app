import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginForm } from "./pages/log-in/log-in.form";
import { UserRegisterLoginTemplate } from "./templates/user-register-login.template";
import { RegisterForm } from "./pages/register/register.form";
import { MainTemplate } from "./templates/main-template/main.template";
import { HomePage } from "./pages/home/home.pages";
import { ProjectManagementPage } from "./pages/project-management/project-management.page";
import { CreateProjectPage } from "./pages/create-project/create-project.page";
import { ProjectDetailPage } from "./pages/project-detail/project-detail.page";
import { userLocalService } from "local-services/local-service";
import { useEffect } from "react";
import UserProfilePage from "pages/user-profile/user-profile.page";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainTemplate />}>
          <Route index path="project" element={<ProjectManagementPage />} />
          <Route index path="create-project" element={<CreateProjectPage />} />
          <Route
            index
            path="project/project-detail/:id"
            element={<ProjectDetailPage />}
          />
          <Route index path="profile" element={<UserProfilePage />} />
        </Route>

        <Route path="/auth" element={<UserRegisterLoginTemplate />}>
          <Route index path="login" element={<LoginForm />} />
          <Route index path="register" element={<RegisterForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
