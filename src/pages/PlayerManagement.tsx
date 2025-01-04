import { useEffect, useState } from "react";
import { Avatar, Button, Card, Input, message, Space, Table } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { IPlayer } from "../type/player";
import fetcher from "../api/fetcher";

function PlayerManagement() {
  const [players, setPlayers] = useState<IPlayer[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const getPlayers = async () => {
      await fetcher
        .get("players")
        .then((res) => {
          console.log(res);
          setPlayers(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPlayers();
  });

  const handleDelete = async (playerId: number) => {
    try {
      await fetcher.delete(`players/${playerId}`);
      setPlayers(players?.filter((player) => player.id !== playerId));
      message.success("Cầu thủ đã được xóa thành công!");
    } catch (err) {
      console.error("Error deleting player:", err);
      message.error("Có lỗi xảy ra khi xóa cầu thủ.");
    }
  };

  const handleEdit = (playerId: number) => {
    navigate(`/players/edit/${playerId}`);
  };

  const columns: TableProps<IPlayer>["columns"] = [
    {
      title: "Hình ảnh",
      key: "image",
      render: (_, record) => (
        <Avatar shape="square" size="large" src={record.imageURL} />
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Vị trí thi đấu",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.id)}>
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card className="m-6">
      <div className="flex justify-between mb-3">
        <div>
          <Input></Input>
        </div>
        <Button onClick={() => navigate("new")} type="primary">
          Thêm cầu thủ
        </Button>
      </div>
      <Table<IPlayer> columns={columns} dataSource={players} />
    </Card>
  );
}

export default PlayerManagement;
