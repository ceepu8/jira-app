import React from "react";

import {
  FileAddOutlined,
  PlusSquareOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export const navbarItems = [
  {
    key: "project-management",
    label: (
      <NavLink to="/project" className="text-white">
        Project Management
      </NavLink>
    ),
    icon: FileAddOutlined,
  },
  {
    key: "create-project",
    label: (
      <NavLink to="/create-project" className="text-white">
        Create Project
      </NavLink>
    ),
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
