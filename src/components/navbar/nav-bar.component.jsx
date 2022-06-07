import React from "react";

import { Layout, Menu } from "antd";
import { navbarItems } from "./nav-bar.settings";

const { Sider } = Layout;

export const NavBar = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["project-management"]}
        defaultOpenKeys={["0", "1"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={navbarItems}
      />
    </Sider>
  );
};
