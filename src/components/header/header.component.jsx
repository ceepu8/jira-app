import React from "react";

import { Menu, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

const items = [
  {
    label: (
      <div className="flex items-center">
        <img
          className="w-[30px] h-full object-contain mr-1"
          src="/images/jira.png"
          alt="logo"
        />
        <span>Jira Sheepu</span>
      </div>
    ),
    key: "logo",
  },
  {
    label: "Your work",
    key: "yourWork",
    icon: <CaretDownOutlined />,
  },
  {
    label: "Projects",
    key: "projects",
    icon: <CaretDownOutlined />,
  },
  {
    label: "Filters",
    key: "filters",
    icon: <CaretDownOutlined />,
  },
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <CaretDownOutlined />,
  },
  {
    label: "People",
    key: "people",
    icon: <CaretDownOutlined />,
  },
  {
    label: "App",
    key: "app",
    icon: <CaretDownOutlined />,
  },
  {
    label: <Button type="primary">Create</Button>,
    key: "create",
  },
];

export const HeaderComponent = () => {
  return (
    <>
      <Menu mode="horizontal" defaultSelectedKeys={["1"]} items={items}></Menu>
    </>
  );
};
