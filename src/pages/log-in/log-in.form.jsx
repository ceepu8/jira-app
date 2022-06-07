import React from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { userLoginActionService } from "../../redux/slices/userSlice";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { payload } = await dispatch(userLoginActionService(values));
        if (payload.statusCode === 200) {
          toast.success("Login successfully");
          setTimeout(() => {
            navigate("/project");
          }, 2000);
        }
      } catch (error) {
        toast.error("Your email or password was wrong, please try again!!");
        console.log(error);
      }
    },
  });
  return (
    <div className="login-form flex flex-col justify-center bg-gray-100">
      <ToastContainer />
      <p className="text-center text-2xl">Login to continue</p>
      <Form
        onFinish={formik.handleSubmit}
        layout="vertical"
        className="text-center px-[20px]"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            id="email"
            name="email"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            id="password"
            name="password"
            prefix={<LockOutlined />}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
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
        <Link to="/register">Register?</Link>
      </div>
    </div>
  );
};
