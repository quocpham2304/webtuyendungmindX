import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Popover, Row, Col } from "antd";
import USER from "../assets/images/profile/pic1.jpg";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import logo from "../assets/images/logo.png";
import logoa from "../assets/images/logo-a.png";
import QLViTri from "./QLViTri/QLViTri";
import DanhSachDotTuyenDung from "./QLDotTuyenDung/DanhSachDotTuyenDung";
import TaoDotTuyenDung from "./QLDotTuyenDung/TaoDotTuyenDung";
import ChiTietDotTuyenDung from "./QLDotTuyenDung/ChiTietDotTuyenDung";
import EditDotTuyenDung from "./QLDotTuyenDung/EditDotTuyenDung";
import Test from "./QLDotTuyenDung/ungVienDotTuyenDung";
import DanhSachUngVien from "./QLUngVien/DanhSachUngVien";
import Login from "../Auth/Login";
import ThemeContextProvider, { ThemeContext } from "./Context/ThemeContext";
import QLBaitest from "./QLBaitest/QLbaitest";
import Themmoibaitest from "./QLBaitest/ThemBaiTest";

const { Header, Sider, Content } = Layout;

export default function Admin() {
  const { isLogin, setIsLogin, userName, setUserName } = useContext(ThemeContext)
  const [collapsed, setCollapsed] = useState({ collapsed: true });
  const [selectedMenuItem, setSelectedMenuItem] = useState("item1");
  let navigate = useNavigate()
  const toggle = () => {
    setCollapsed((collapsed) => !collapsed);
  };
  const componentsSwitch = (key) => {
    switch (key) {
      case "item1":
        return <QLViTri />;
      //case "item2":
      // return <QLTuyenDung />;
      //return <QLViTri />;
      default:
        break;
    }
  };

  const handleDangXuat = () => {
    setIsLogin(false)
    setUserName()
    sessionStorage.removeItem('isLogin')
    sessionStorage.removeItem('username')
    navigate('/admin/login')
  }
  
  const content = (
    <Menu>
      <Menu.Item>
        <Link onClick={() => handleDangXuat()}>
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (

    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <Link to="/admin">
            <img src={collapsed ? logoa : logo} alt="" />
          </Link>
        </div>
        <Menu
          selectedKeys={selectedMenuItem}
          theme="dark"
          mode="inline"
          onClick={(e) => setSelectedMenuItem(e.key)}
        >
          <Menu.Item key="item1" icon={<AppstoreOutlined />}>
            <Link to="quan-li-vi-tri">Quản lý vị trí </Link>
          </Menu.Item>
          <Menu.Item key="item2" icon={<DatabaseOutlined />}>
            <Link to="dottuyendung">Quản lý tuyển dụng</Link>
          </Menu.Item>
          <Menu.Item key="item3" icon={<VideoCameraOutlined />}>
            <Link to="quan-li-bai-test">Quản lý bài test</Link>
          </Menu.Item>
          <Menu.Item key="item4" icon={<UserOutlined />}>
            <Link to="ungvien">Quản lý ứng viên</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col span={18}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
            </Col>
            <Col span={3} offset={3}>
              <Popover content={content}>
                <a href="#" className="dropdown-toggle nav-link">
                  <span className="user-img">
                    <img
                      className="rounded-circle"
                      src={USER}
                      width={40}
                      alt={"Binh"}
                      style={{ verticalAlign: "middle", borderRadius: "50%" }}
                    /> &nbsp;&nbsp;
                    {!isLogin ? "Đăng nhập" : `${userName}`}
                  </span>
                </a>
              </Popover>
            </Col>
          </Row>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
          }}
        >
          {!isLogin ? <Login /> :
            (<Routes>
              <Route path="quan-li-vi-tri" element={<QLViTri />} />
              <Route path="login" element={<Login />} />
              <Route path="dottuyendung/create" element={<TaoDotTuyenDung />} />
              <Route path="dottuyendung/chitiet/:idDotTuyenDung" element={<ChiTietDotTuyenDung />} />
              <Route path="dottuyendung/edit/:idDotTuyenDung" element={<EditDotTuyenDung  />} />
              <Route path="dottuyendung" element={<DanhSachDotTuyenDung />} />
              <Route path="ungvien" element={<DanhSachUngVien />} />
              <Route path="test" element={<Test />} />
              <Route path="quan-li-bai-test" element={<QLBaitest />} />
            <Route path="quan-li-bai-test/:pageType/:id?" element={<Themmoibaitest />} />
          </Routes>)}
        </Content>
      </Layout>
    </Layout>
  );
}
