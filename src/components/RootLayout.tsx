import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import {
  CameraOutlined,
  CopyrightOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Vleague1 from "@/assets/VLeague1.png";
import Vleague2 from "@/assets/VLeague2.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MenuProps } from "antd/lib";
import { logoutUser } from "@/store/slice/user.slice";
import { deleteToken } from "@/store/slice/token.slice";
import defaultAvatar from "../assets/defaultAvatar.png";

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
  // {
  //   key: "1",
  //   icon: <BarChartOutlined style={{ width: "24px" }} />,
  //   label: "Thống kê",
  // },
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
        key: "match/vleague-1",
        label: "Lịch thi đấu",
        path: "/match/vleague-1",
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
        key: "match/vleague-2",
        label: "Lịch thi đấu",
        path: "/match/vleague-2",
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

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const accessToken = useSelector((state: RootState) => state.token);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);
  const getSelectedKeys = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (
      [
        "current-season",
        "season-clubs",
        "match",
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

  const handleLogout = () => {
    navigate("/login");
    dispatch(logoutUser());
    dispatch(deleteToken());
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={() => navigate("/profile")}>Tài khoản</span>,
      icon: <UserOutlined />,
    },

    {
      key: "2",
      label: <span onClick={handleLogout}>Đăng xuất</span>,
      icon: <LogoutOutlined />,
    },
  ];
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
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
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
          {user?.id ? (
            <Dropdown className="text-gray-900" menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <p className="text-gray-900 font-bold">{user?.name}</p>

                  <Avatar src={user?.avatar || defaultAvatar} />
                  <DownOutlined className="text-gray-900" />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Button>
              <a href="/login" className=" text-nowrap">
                Đăng nhập
              </a>
            </Button>
          )}
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
