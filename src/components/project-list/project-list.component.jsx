import React, { useEffect, useState } from "react";

import { Table, Button } from "antd";

import { projectThreadColumn } from "../../utils/project-management.utils";
import {
  deleteProject,
  getAllProject,
} from "../../apis/project.management.apis";

import { ToastContainer, toast } from "react-toastify";

import { EditModalComponent } from "../edit-modal.component/edit-modal.component";
import { ProjectFormTemplate } from "../../templates/project-form-template/project-form.template";

export const ProjectListComponent = () => {
  const [projects, setProjects] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [projectDetailId, setProjectDetailId] = useState(0);
  const [deleteAction, setDeleteActionHappen] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProject();
        setProjects([...data.content]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [deleteAction]);

  const showEditModal = (projectId) => {
    setProjectDetailId(projectId);
    setVisible(true);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const data = await deleteProject(projectId);
      if (data.statusCode === 200) {
        toast.success("Delete project successfully");
        setDeleteActionHappen(!deleteAction);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderDataTable = (projectList) => {
    return projectList.map((project, index) => {
      let content = (
        <div className="action" key={project.name + index}>
          <Button type="primary mr-2" onClick={() => showEditModal(project.id)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteProject(project.id)}>
            Delete
          </Button>
        </div>
      );
      return { ...project, action: content };
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <ToastContainer />
      <Table
        className="p-[10px]"
        columns={projectThreadColumn}
        dataSource={renderDataTable(projects)}
      />
      <EditModalComponent
        isVisible={isVisible}
        handleCancel={handleCancel}
        Element={ProjectFormTemplate}
        projectDetailId={projectDetailId}
      />
    </>
  );
};
