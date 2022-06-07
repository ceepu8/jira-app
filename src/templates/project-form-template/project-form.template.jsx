import React, { useEffect, useRef, useState } from "react";

import { getDetailProject } from "../../apis/project.management.apis";

import { Editor } from "@tinymce/tinymce-react";

import { Form, Input, Button, Select } from "antd";
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export const ProjectFormTemplate = ({ projectDetailId, isModal, handleOk }) => {
  const editorRef = useRef(null);
  const [projectDetail, setProjectDetail] = useState({
    id: 0,
    projectCategory: {
      id: "",
      name: "Dự án di động",
    },
    projectName: "",
    description:
      "<p>Please write the summary description for your project...</p>",
  });
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    async function fetchProjectDetail() {
      try {
        const data = await getDetailProject(projectDetailId);
        setProjectDetail({ ...data.content });
      } catch (error) {
        console.log(error);
      }
    }
    fetchProjectDetail();
  }, [projectDetailId]);

  return (
    <div className={`${isModal ? "w-[100%]" : "w-[50%]"}  mx-auto mt-5`}>
      <p className="text-[24px] font-medium">
        {isModal ? "Project Edit" : "Project Details"}
      </p>
      <Form layout="vertical">
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
            value={projectDetail.projectName}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              message: "Please input the project's description!",
            },
          ]}
        >
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={projectDetail.description}
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
        </Form.Item>
        <Form.Item
          label="Project Category"
          rules={[
            {
              message: "Please input the project's category!",
            },
          ]}
        >
          <Select
            value={projectDetail.projectCategory.name}
            className="w-full"
            onChange={handleChange}
          >
            <Option value="Dự án phần mềm">Software </Option>
            <Option value="Dự án web">Web Application</Option>
            <Option value="Dự án di động">Mobile Application</Option>
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
