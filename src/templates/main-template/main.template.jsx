import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { userLocalService } from "../../local-services/local-service";

import "./main-template.style.css";

import { Layout } from "antd";
import { NavBar } from "../../components/navbar/nav-bar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ToastContainer } from "react-toastify";
const { Header, Content } = Layout;

export const MainTemplate = (props) => {
  const { Element, ...restProps } = props;

  const navigate = useNavigate();
  const checkUser = () => {
    const currentUser = userLocalService.getUserInfor();
    if (!currentUser) {
      navigate("/login");
    }
  };
  useEffect(() => {
    navigate("/project");
    checkUser();
  }, []);
  return (
    <div>
      <ToastContainer autoClose="2000" />
      <Layout>
        <NavBar />
        <Layout className="site-layout min-h-screen">
          <Content
            className="site-layout-background pt-[30px]"
            style={{ margin: "24px 16px 0", overflow: "initial" }}
          >
            <div
              className="site-layout-background min-h-full  "
              style={{ padding: 24, textAlign: "center" }}
            >
              <Outlet className="min-h-full" />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
