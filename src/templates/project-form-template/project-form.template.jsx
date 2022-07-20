import React, { useEffect, useRef, useState } from "react";

import {
  createProject,
  getDetailProject,
  updateProject,
} from "../../apis/project.management.apis";

import { Editor } from "@tinymce/tinymce-react";

import { Form, Input, Button, Select } from "antd";
import { toast } from "react-toastify";
import { changingHappen } from "../../redux/slices/changingSlice";
import { useDispatch } from "react-redux";
const { Option } = Select;

export const ProjectFormTemplate = ({ projectDetailId, isModal }) => {
  console.log(123);
  const dispatch = useDispatch();
  const [projectDetail, setProjectDetail] = useState({
    id: 0,
    categoryId: 1,
    creator: 0,
    projectName: "",
    description:
      "<p>Please write the summary description for your project...</p>",
  });
  const handleChange = (idEditor) => {
    return (e, anything) => {
      if (idEditor) {
        const { name, value, key } = anything;
        if (name === "categoryId") {
          setProjectDetail((projectDetail) => ({
            ...projectDetail,
            categoryId: Number(e),
          }));
        } else {
          setProjectDetail((projectDetail) => ({
            ...projectDetail,
            description: e,
          }));
        }
      } else {
        const { value, name } = e.target;
        setProjectDetail((projectDetail) => ({
          ...projectDetail,
          [name]: value,
        }));
      }
    };
  };

  const handleSubmit = async () => {
    try {
      let response;
      let data = {
        projectName: projectDetail.projectName,
        description: projectDetail.description,
        categoryId: projectDetail.categoryId,
        alias: "string",
      };
      if (projectDetailId) {
        data = {
          ...data,
          id: projectDetailId,
          creator: projectDetail.creator.id,
          categoryId: projectDetail.projectCategory.id,
        };
        delete data.alias;
        response = await updateProject(data);
      } else {
        response = await createProject(data);
      }
      if (response.statusCode === 200) {
        toast.success("Project được tạo thành công!!");
        dispatch(changingHappen());
      } else {
        toast.error(response.content);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isModal) {
      async function fetchProjectDetail() {
        try {
          const data = await getDetailProject(projectDetailId);
          setProjectDetail({ ...data.content });
        } catch (error) {
          console.log(error);
        }
      }
      fetchProjectDetail();
    }
  }, [projectDetailId]);

  return (
    <div className={`${isModal ? "w-[100%]" : "w-[50%]"}  mx-auto mt-5`}>
      <p className="text-[24px] font-medium">
        {isModal ? "Project Edit" : "Project Details"}
      </p>
      <Form layout="vertical" onFinish={handleSubmit}>
        {isModal ? (
          <Form.Item label="ProjectID">
            <Input
              id="projectId"
              name="projectId"
              disabled
              value={projectDetail.id}
            />
          </Form.Item>
        ) : (
          ""
        )}
        <Form.Item
          label="Name"
          rules={[
            {
              message: "Please input the project's name!",
            },
          ]}
        >
          <Input
            id="projectName"
            name="projectName"
            value={projectDetailId && projectDetail.projectName}
            onChange={handleChange(false)}
          />
        </Form.Item>

        <Editor
          onEditorChange={handleChange(true)}
          value={projectDetail.description}
          init={{
            height: 200,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        <Form.Item
          label="Project Category"
          rules={[
            {
              message: "Please input the project's category!",
            },
          ]}
        >
          <Select
            value={
              projectDetail.categoryId === 1
                ? "Web Application"
                : projectDetail.categoryId === 2
                ? "Software"
                : "Mobile Application"
            }
            className="w-full"
            name="categoryId"
            onChange={handleChange(true)}
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
