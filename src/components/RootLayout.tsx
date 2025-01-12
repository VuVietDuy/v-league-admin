import React, { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import {
  BarChartOutlined,
  CameraOutlined,
  CopyrightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import Vleague1 from "../assets/VLeague1.png";
import Vleague2 from "../assets/VLeague2.png";
import NationalCup from "../assets/NationalCup.png";

const { Header, Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  width: "300px",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const menuItems = [
  {
    key: "1",
    icon: <BarChartOutlined style={{ width: "24px" }} />,
    label: "Thống kê",
  },
  {
    key: "vleague-1",
    icon: <img src={Vleague1} width={24} />,
    label: "Vô địch quốc gia",
    children: [
      {
        key: "current-season/vleague-1",
        label: "Mùa giải hiện tại",
        path: "/current-season/vleague-1",
      },
      {
        key: "fixture/vleague-1",
        label: "Lịch thi đấu",
        path: "/fixture/vleague-1",
      },
      {
        key: "tables/vleague-1",
        label: "Bảng thi đấu",
        path: "/tables/vleague-1",
      },
      {
        key: "season-clubs/vleague-1",
        label: "Đội bóng",
        path: "/season-clubs/vleague-1",
      },
      {
        key: "category/vleague-1",
        label: "Điều lệ",
        path: "/category/vleague-1",
      },
    ],
  },
  {
    key: "vleague-2",
    icon: <img src={Vleague2} width={24} />,
    label: "Hạng nhất quốc gia",
    children: [
      {
        key: "current-season/vleague-2",
        label: "Mùa giải hiện tại",
        path: "/current-season/vleague-2",
      },
      {
        key: "fixture/vleague-2",
        label: "Lịch thi đấu",
        path: "/fixture/vleague-2",
      },
      {
        key: "tables/vleague-2",
        label: "Bảng thi đấu",
        path: "/tables/vleague-2",
      },
      {
        key: "season-clubs/vleague-2",
        label: "Đội bóng",
        path: "/season-clubs/vleague-2",
      },
      {
        key: "category/vleague-2",
        label: "Điều lệ",
        path: "/category/vleague-2",
      },
    ],
  },
  {
    key: "national-cup",
    icon: <img src={NationalCup} width={24} />,
    label: "Cúp quốc gia",
    children: [
      {
        key: "current-season/national-cup",
        label: "Mùa giải hiện tại",
        path: "/current-season/national-cup",
      },
      {
        key: "fixture/national-cup",
        label: "Lịch thi đấu",
        path: "/fixture/national-cup",
      },
      {
        key: "tables/national-cup",
        label: "Bảng thi đấu",
        path: "/tables/national-cup",
      },
      {
        key: "season-clubs/national-cup",
        label: "Đội bóng",
        path: "/season-clubs/national-cup",
      },
      {
        key: "category/national-cup",
        label: "Điều lệ",
        path: "/category/national-cup",
      },
    ],
  },
  {
    key: "news",
    icon: <CameraOutlined style={{ width: "24px" }} />,
    label: "Quản lý tin tức",
    path: "/news",
  },
  {
    key: "clubs",
    icon: <CopyrightOutlined style={{ width: "24px" }} />,
    label: "Quản lý đội bóng",
    path: "/clubs",
  },
  {
    key: "players",
    icon: <UserOutlined style={{ width: "24px" }} />,
    label: "Quản lý cầu thủ",
    path: "/players",
  },
  {
    key: "users",
    icon: <UsergroupAddOutlined style={{ width: "24px" }} />,
    label: "Quản lý người dùng",
    path: "/users",
  },
];

const RootLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getSelectedKeys = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (
      [
        "current-season",
        "season-clubs",
        "fixture",
        "category",
        "tables",
      ].includes(pathSegments[0])
    ) {
      return [pathSegments[0] + "/" + pathSegments[1]];
    }
    return [pathSegments[0]];
  };

  const renderMenuItems = (items: any[]) =>
    items.map((item) =>
      item.children ? (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item.key} icon={item.icon}>
          <NavLink to={item.path || `/${item.key}`}>{item.label}</NavLink>
        </Menu.Item>
      )
    );

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        style={siderStyle}
        trigger={null}
        width={240}
        collapsible
        collapsed={collapsed}
      >
        <div
          style={{
            height: "32px",
            borderRadius: "8px",
            backgroundColor: "#334454",
            margin: "16px",
          }}
        />
        <Menu theme="dark" mode="inline" selectedKeys={getSelectedKeys()}>
          {renderMenuItems(menuItems)}
        </Menu>
      </Sider>

      <Layout
        style={{
          marginInlineStart: collapsed ? 80 : 240,
          transition: "all 0.2s",
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
