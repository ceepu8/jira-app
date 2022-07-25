import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./style.module.css";

import {
  createProject,
  getDetailProject,
  updateProject,
} from "apis/project.management.apis";

import { Editor } from "@tinymce/tinymce-react";

import { Form, Input, Button, Select } from "antd";

import { toast } from "react-toastify";
import { closeProjectEditForm } from "redux/slices/toggleSlice";
import { fetchProjectList } from "redux/slices/projectSlice";
const { Option } = Select;

export const CreateProjectForm = ({ projectDetailId }) => {
  const { isProjectFormEditToggle } = useSelector((state) => state.toggleSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentProject, setCurrentProject] = useState({
    projectName: "",
    description: "",
    categoryId: 1,
  });

  const createProjectWithAPI = async () => {
    try {
      const data = await createProject(currentProject);
      if (data.statusCode === 200) {
        toast.success("Create project successfully!!");
        setTimeout(() => {
          navigate("/project");
        }, 2000);
      }
    } catch (error) {
      switch (error.statusCode) {
        case 500:
          toast.error("Project name already in use!");
          break;

        default:
          break;
      }
    }
  };

  const updateProjectWithAPI = async () => {
    try {
      const data = await updateProject({
        ...currentProject,
        id: projectDetailId,
      });
      if (data.statusCode === 200) {
        toast.success("Update project successfully!!");
        dispatch(closeProjectEditForm());
        dispatch(fetchProjectList());
      }
      dispatch();
    } catch (error) {
      toast.error("Updating project failed!");
    }
  };

  const handleFinish = async () => {
    if (projectDetailId) {
      await updateProjectWithAPI();
    } else {
      await createProjectWithAPI();
    }
  };

  useEffect(() => {
    if (projectDetailId) {
      const fetchData = async () => {
        try {
          const { content } = await getDetailProject(projectDetailId);
          setCurrentProject({
            projectName: content.projectName,
            description: content.description,
            categoryId: content.projectCategory.id,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [projectDetailId]);

  return (
    <div
      className={`${
        isProjectFormEditToggle ? "w-[100%]" : styles.formWidth
      }  mx-auto mt-5`}
    >
      <p className="text-[24px] font-medium">
        {isProjectFormEditToggle ? "Project Edit" : "Project Details"}
      </p>
      <Form layout="vertical" onFinish={handleFinish}>
        {isProjectFormEditToggle ? (
          <Form.Item label="ProjectID">
            <Input
              id="projectId"
              name="projectId"
              disabled
              value={projectDetailId}
            />
          </Form.Item>
        ) : (
          ""
        )}
        <Form.Item
          label="Name"
          rules={[{ required: true, message: "Please input project's name" }]}
        >
          <Input
            name="projectName"
            value={currentProject.projectName}
            onChange={(e) => {
              setCurrentProject((state) => ({
                ...state,
                projectName: e.target.value,
              }));
            }}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Editor
            init={{ menubar: false }}
            value={currentProject.description}
            onEditorChange={(value) => {
              setCurrentProject((state) => ({ ...state, description: value }));
            }}
          />
        </Form.Item>

        <Form.Item
          label="Project Category"
          rules={[
            {
              required: true,
              message: "Please input the project's category!",
            },
          ]}
        >
          <Select
            value={
              currentProject.categoryId == 1
                ? "Web Application"
                : currentProject.categoryId == 2
                ? "Software"
                : "Mobile Application"
            }
            className="w-full"
            name="categoryId"
            onChange={(value) => {
              setCurrentProject((state) => ({ ...state, categoryId: value }));
            }}
          >
            <Option value="2" name="categoryId">
              Software
            </Option>
            <Option value="1" name="categoryId">
              Web Application
            </Option>
            <Option value="3" name="categoryId">
              Mobile Application
            </Option>
          </Select>
        </Form.Item>

        <Form.Item className="text-right">
          <Button htmlType="submit" className="bg-blue-400 text-white rounded">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
