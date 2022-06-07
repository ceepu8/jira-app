import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { userLocalService } from "../../local-services/local-service";

import "./main-template.style.css";

import { Layout } from "antd";
import { NavBar } from "../../components/navbar/nav-bar.component";
import { HeaderComponent } from "../../components/header/header.component";
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
      <Layout className="h-screen">
        {/* Header */}
        <Header className="header p-0">
          <HeaderComponent />
        </Header>
        <Layout>
          {/* Navbar */}
          <NavBar />
          {/* Content */}
          <Layout className="p-[10px]">
            <Content className="site-layout-background">
              <Element />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
