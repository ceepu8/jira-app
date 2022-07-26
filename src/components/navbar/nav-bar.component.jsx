import { useLocation } from "react-router-dom";

import { Layout, Menu } from "antd";
import { navbarItems } from "./nav-bar.settings";

const { Sider } = Layout;

export const NavBar = () => {
  let { pathname } = useLocation();

  return (
    <Sider width={200} breakpoint="lg" collapsedWidth="0">
      <div className="flex items-center py-[20px] justify-center">
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
        defaultSelectedKeys={pathname === "/project" ? ["0"] : ["1"]}
        style={{
          borderRight: 0,
          color: "white",
        }}
        items={navbarItems}
      />
    </Sider>
  );
};
