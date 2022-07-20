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
    checkUser();
  }, []);
  return (
    <div>
      <ToastContainer autoClose="2000" />
      <Layout className="min-h-screen">
        <Layout>
          <NavBar />
          <Layout>
            <Content className="site-layout-background p-[30px]">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
