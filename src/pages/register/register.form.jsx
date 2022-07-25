import React from "react";

import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { registerUser } from "apis/user.management.apis";
import { toast } from "react-toastify";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response.statusCode === 200) {
        toast.success("Register account successfully!");
        navigate("/auth/login");
      }
    } catch (error) {
      switch (error.statusCode) {
        case 400:
          toast.error("Email already in use");
          break;

        case 500:
          toast.error("Internal Network Error");
          break;

        default:
          break;
      }
    }
  };

  return (
    <div className="flex flex-col justify-center bg-gray-100">
      <p className="text-center text-2xl">Register</p>

      <Form
        className="px-[20px]"
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input {...field} prefix={<UserOutlined />} />
            </Form.Item>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input {...field} prefix={<MailOutlined />} />
            </Form.Item>
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input {...field} prefix={<PhoneOutlined />} />
            </Form.Item>
          )}
        />

        <Controller
          name="passWord"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Password"
              name="passWord"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password {...field} prefix={<LockOutlined />} />
            </Form.Item>
          )}
        />

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["passWord"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("passWord") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-blue-400 w-full text-white rounded"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="login-nav text-center">
        <Link to="/auth/login">Login?</Link>
      </div>
    </div>
  );
};
