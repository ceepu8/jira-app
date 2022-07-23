import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { projectThreadColumn } from "utils/project-management.utils";
import { deleteProject } from "apis/project.management.apis";

import { toast } from "react-toastify";

import { EditModalComponent } from "../edit-modal.component/edit-modal.component";

import { CreateProjectForm } from "forms/create-project-form/create-project-form";
import { fetchProjectList } from "redux/slices/projectSlice";
import { SpinnerComponent } from "components/spinner/spinner.component";
import {
  closeProjectEditForm,
  openProjectEditForm,
} from "redux/slices/toggleSlice";

export const ProjectListTableComponent = () => {
  const [projectDetailId, setProjectDetailId] = useState(0);
  const { isProjectFormEditToggle } = useSelector((state) => state.toggleSlice);

  const { projectList, isLoading } = useSelector((state) => state.projectSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectList());
  }, []);

  const showEditModal = (projectId) => {
    setProjectDetailId(projectId);
    dispatch(openProjectEditForm());
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const data = await deleteProject(projectId);
      if (data.statusCode === 200) {
        toast.success("Delete project successfully");
        dispatch(fetchProjectList());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirm = (projectId) => {
    return (e) => {
      handleDeleteProject(projectId);
    };
  };

  if (isLoading) {
    return <SpinnerComponent />;
  }

  const renderDataTable = (projectList) => {
    return projectList.map((project, index) => {
      let content = (
        <div className="action" key={project.name + index}>
          <Button
            icon={<EditOutlined />}
            type="primary mr-2"
            onClick={() => showEditModal(project.id)}
          ></Button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={confirm(project.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="danger mr-2"></Button>
          </Popconfirm>
        </div>
      );

      return { ...project, action: content };
    });
  };

  return (
    <>
      <span className="text-[24px] font-medium px-[20px]">
        Project Management
      </span>
      <Table
        className="p-[10px]"
        columns={projectThreadColumn}
        dataSource={projectList && renderDataTable(projectList)}
      />
      <EditModalComponent
        isVisible={isProjectFormEditToggle}
        handleCancel={() => dispatch(closeProjectEditForm())}
        Element={CreateProjectForm}
        projectDetailId={projectDetailId}
      />
    </>
  );
};
