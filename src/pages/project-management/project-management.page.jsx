import React from "react";
import { useSelector } from "react-redux";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { ProjectListTableComponent } from "./project-list-table/project-list-table.component";

export const ProjectManagementPage = () => {
  return (
    <div className="h-[100%]">
      <span className="text-[24px] font-medium px-[20px]">
        Project Management
      </span>
      <ProjectListTableComponent />
    </div>
  );
};
