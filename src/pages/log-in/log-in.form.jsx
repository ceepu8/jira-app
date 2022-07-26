import React from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import {
  setErrorToNull,
  userLoginActionService,
} from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const onSubmit = (values) => {
    dispatch(userLoginActionService(values));
  };
  if (user) {
    toast.success("Login successfully!");
    navigate("/project");
  }

  if (error) {
    toast.error(error.message);
    dispatch(setErrorToNull());
  }

  return (
    <div className="login-form flex flex-col justify-center bg-gray-100">
      <p className="text-center text-2xl">Login to continue</p>
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        className="text-center px-[20px]"
        fields={[
          {
            name: "email",
            value: "@gmail.com",
          },
        ]}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="passWord"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="bg-blue-400 w-full text-white rounded"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="register text-center">
        <Link to="/auth/register">Register?</Link>
      </div>
    </div>
  );
};
