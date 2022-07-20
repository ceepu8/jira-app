import React from "react";

import { Layout, Menu } from "antd";
import { navbarItems } from "./nav-bar.settings";

const { Sider } = Layout;

export const NavBar = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <div
        className="flex items-center py-[20px] justify-center"
        style={{ backgroundColor: "#0151b3" }}
      >
        <img
          className="w-[50px] h-full object-contain mr-1"
          src="/images/check-list.png"
          alt="logo"
        />
        <span className="text-lg font-semibold text-white">Jira Sheepu</span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        style={{
          height: "100%",
          borderRight: 0,
          backgroundColor: "#0050b3",
          color: "white",
        }}
        items={navbarItems}
      />
    </Sider>
  );
};
