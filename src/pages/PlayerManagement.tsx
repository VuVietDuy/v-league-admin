import { Button, Card, Input, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Player } from "../type/player";
import { players } from "../data/players";
import { useNavigate } from "react-router-dom";

const columns: TableProps<Player>["columns"] = [
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tuổi",
    dataIndex: "age",
    key: "age",
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
        <Button type="primary">
          <EditOutlined />
        </Button>
        <Button type="primary" danger>
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];

function PlayerManagement() {
  const navigate = useNavigate();
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
      <Table<Player> columns={columns} dataSource={players} />
    </Card>
  );
}

export default PlayerManagement;
