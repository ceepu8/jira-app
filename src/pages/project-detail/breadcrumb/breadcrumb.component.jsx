import { Breadcrumb } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

export const BreadcrumbComponent = ({ projectName }) => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/project">Project Management</NavLink>
        </Breadcrumb.Item>

        <Breadcrumb.Item>{projectName}</Breadcrumb.Item>
      </Breadcrumb>
      <p className="text-[25px] text-blue-900 font-semibold">{projectName}</p>
    </>
  );
};
