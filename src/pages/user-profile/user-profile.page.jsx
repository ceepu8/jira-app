import { Input, Form, Button } from "antd";

import { useForm, Controller } from "react-hook-form";

import { userLocalService } from "local-services/local-service";
import { useState } from "react";
import { updateUserInfo } from "apis/user.management.apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutUser } from "redux/slices/userSlice";

const UserProfilePage = () => {
  const user = userLocalService.getUserInfor();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUpdate, setUpdate] = useState(false);
  const [isCancel, setCancel] = useState(false);
  const [fields, setFields] = useState([
    {
      name: ["name"],
      value: user.name,
    },
    {
      name: ["phoneNumber"],
      value: user.phoneNumber,
    },
    {
      name: ["email"],
      value: user.email,
    },
    {
      name: ["passWord"],
      value: "",
    },
  ]);

  const onSubmit = async (values) => {
    const data = { ...values, id: user.id };
    try {
      const response = await updateUserInfo(data);
      if (response.statusCode === 200) {
        toast.success("Update user info successfully!!");
        setUpdate(false);
        setCancel(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const avatarStyle = {
    borderRadius: "50%",
    width: "70px",
    margin: "auto",
    position: "relative",
    bottom: "-45px",
    left: "0",
  };

  const formStyle = {
    padding: "30px 20px 20px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    textAlign: "left",
  };

  const [form] = Form.useForm();
  console.log("renders");
  return (
    <div>
      <h1 className="text-2xl">User Profile</h1>
      <div className="w-[45%] m-auto">
        <div className="mb-3">
          <img style={avatarStyle} src={user.avatar} alt="avatar" />
        </div>

        <Form
          style={formStyle}
          layout="vertical"
          onFinish={onSubmit}
          onFieldsChange={(event, allFields) => {
            setFields(allFields);
            if (event[0].touched) {
              setUpdate(true);
              setCancel(true);
            }
            if (event[0].value === "") {
              setUpdate(false);
            }
          }}
          autoComplete="off"
          form={form}
          fields={fields}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <Input placeholder="large size" />
          </Form.Item>
          <Form.Item name="passWord" label="Password">
            <Input.Password />
          </Form.Item>
          <div className="text-right">
            {isUpdate && (
              <Button className="mr-2" htmlType="submit" type="primary">
                Update Info
              </Button>
            )}
            {isCancel && (
              <Button
                onClick={() => {
                  setUpdate(false);
                  setCancel(false);
                  setFields([
                    {
                      name: ["name"],
                      value: user.name,
                    },
                    {
                      name: ["phoneNumber"],
                      value: user.phoneNumber,
                    },
                    {
                      name: ["email"],
                      value: user.email,
                    },
                    {
                      name: ["passWord"],
                      value: "",
                    },
                  ]);
                }}
                className="mr-2"
                type="primary"
              >
                Cancel
              </Button>
            )}

            <Button
              type="primary"
              danger
              onClick={() => {
                userLocalService.removeUserInfor();
                dispatch(logoutUser());
                navigate("/auth/login");
              }}
            >
              Logout
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserProfilePage;
