import React from "react";

import {
  BarChartOutlined,
  InsertRowBelowOutlined,
  CodeOutlined,
  GatewayOutlined,
  FileAddOutlined,
  PlusSquareOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export const navbarItems = [
  {
    key: "planning",
    label: "Planning",
    children: [
      { label: "Roadmap", icon: BarChartOutlined },
      { key: "board", label: "Board", icon: InsertRowBelowOutlined },
    ],
  },
  {
    key: "development",
    label: "Development",
    children: [
      { label: "Code", icon: CodeOutlined },
      { label: "Releases", icon: GatewayOutlined },
    ],
  },
  {
    key: "project-management",
    label: <NavLink to="/project">Project Management</NavLink>,
    icon: FileAddOutlined,
  },
  {
    key: "create-project",
    label: <NavLink to="/create-project">Create Project</NavLink>,
    icon: PlusSquareOutlined,
  },
  {
    key: "project-setting",
    label: "Project settings",
    icon: SettingOutlined,
  },
].map((item, index) => {
  return {
    key: index,
    label: item.label,
    icon: item.icon && React.createElement(item.icon),
    children:
      item.children &&
      item.children.map((child, j) => {
        return {
          key: child.label,
          label: child.label,
          icon: React.createElement(child.icon),
        };
      }),
  };
});
