import React from "react";
import { useNavigate } from "react-router";
import { ProjectListComponent } from "../../components/project-list/project-list.component";
import { userLocalService } from "../../local-services/local-service";

export const HomePage = () => {
  const navigate = useNavigate();
  const checkUser = () => {
    const currentUser = userLocalService.getUserInfor();
    if (!currentUser) {
      navigate("/login");
    }
  };

  return (
    <div>
      <span className="text-[24px] font-medium px-[20px]">
        Project Management
      </span>
      <ProjectListComponent />
    </div>
  );
};
