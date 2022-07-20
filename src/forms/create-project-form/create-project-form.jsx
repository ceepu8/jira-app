import React, { useEffect, useState } from "react";

import {
  createProject,
  getDetailProject,
  updateProject,
} from "../../apis/project.management.apis";

import { Editor } from "@tinymce/tinymce-react";

import { Form, Input, Button, Select } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;

export const CreateProjectForm = ({ projectDetailId, isModal }) => {
  const [currentProject, setCurrentProject] = useState({
    projectName: "",
    description: "",
    categoryId: 1,
  });

  const handleFinish = async () => {
    if (projectDetailId) {
      const data = await updateProject({
        ...currentProject,
        id: projectDetailId,
      });
      console.log(data);
    } else {
      const data = await createProject(currentProject);
      console.log(data);
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
    <div className={`${isModal ? "w-[100%]" : "w-[50%]"}  mx-auto mt-5`}>
      <p className="text-[24px] font-medium">
        {isModal ? "Project Edit" : "Project Details"}
      </p>
      <Form layout="vertical" onFinish={handleFinish}>
        {isModal ? (
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
