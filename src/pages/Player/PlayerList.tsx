import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Input,
  message,
  Select,
  Space,
  Table,
} from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { IPlayer } from "../../type/player";
import fetcher from "../../api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { renderPositionText } from "@/utils/renderPositionText";

function PlayerList() {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [clubId, setClubId] = useState("");
  const { data: clubs } = useQuery({
    queryKey: ["GET_LIST_CLUBS"],
    queryFn: async () => fetcher.get("clubs").then((res) => res.data),
  });
  const { data: players, refetch } = useQuery({
    queryKey: ["GET_LIST_PLAYERS"],
    queryFn: async () => {
      let params = {};
      if (clubId) {
        params = { ...params, clubId: clubId };
      }
      if (key) {
        params = { ...params, key: key };
      }
      return fetcher
        .get("players", { params: params })
        .then((res) => res.data.data);
    },
  });

  useEffect(() => {
    refetch();
  }, [key, clubId]);

  const handleDelete = async (playerId: number) => {
    try {
      await fetcher.delete(`players/${playerId}`);
      refetch();
      message.success("Cầu thủ đã được xóa thành công!");
    } catch (err) {
      console.error("Error deleting player:", err);
      message.error("Có lỗi xảy ra khi xóa cầu thủ.");
    }
  };

  const handleEdit = (playerId: number) => {
    navigate(`/players/${playerId}/edit`);
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
      render: (_, record) => (
        <Link className="font-bold" to={`/players/${record.id}`}>
          {record.name}
        </Link>
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Quản lý câu lạc bộ",
      dataIndex: "club",
      key: "club",
      render: (_: any, record: any) => <span>{record.club?.name}</span>,
    },
    {
      title: "Vị trí thi đấu",
      dataIndex: "position",
      key: "position",
      render: (value: any) => <span>{renderPositionText(value)}</span>,
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
        <div className="flex gap-4">
          <div className="flex gap-2">
            <Input
              onChange={(e) => setKey(e.target.value)}
              placeholder="Tìm kiếm"
            ></Input>
          </div>
          <Select
            onChange={(e) => setClubId(e)}
            className="w-40"
            defaultValue={""}
          >
            <Select.Option value="">Tất cả đội bóng</Select.Option>
            {clubs &&
              clubs.map((club: any, index: any) => (
                <Select.Option key={index} value={club.id}>
                  {club.name}
                </Select.Option>
              ))}
          </Select>
        </div>
        <Button onClick={() => navigate("new")} type="primary">
          Thêm cầu thủ
        </Button>
      </div>
      <Table<IPlayer> rowKey="id" columns={columns} dataSource={players} />
    </Card>
  );
}

export default PlayerList;
