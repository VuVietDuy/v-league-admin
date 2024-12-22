import { Button, Card, Input, Space, Table, TableProps } from "antd";
import { Club } from "../type/club";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { clubs } from "../data/clubs";
import { useNavigate, useNavigation } from "react-router-dom";

const columns: TableProps<Club>["columns"] = [
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Năm thành lập",
    dataIndex: "stadium",
    key: "stadium",
  },
  {
    title: "Huấn luyện viên",
    dataIndex: "coach",
    key: "coach",
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

function ClubManagement() {
  const navigation = useNavigate();
  return (
    <Card className="m-6">
      <div className="flex justify-between mb-3">
        <div>
          <Input></Input>
        </div>
        <Button onClick={() => navigation("new")} type="primary">
          Thêm clb{" "}
        </Button>
      </div>
      <Table<Club> columns={columns} dataSource={clubs} />
    </Card>
  );
}

export default ClubManagement;
