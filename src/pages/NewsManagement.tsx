import { Badge, Button, Card, Input, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { News } from "../type/news";
import { listNews } from "../data/news";
import { useNavigate } from "react-router-dom";

const columns: TableProps<News>["columns"] = [
  {
    title: "Ảnh bìa",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (text) => <img src={text} width={60}></img>,
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Loại",
    dataIndex: "category",
    key: "category",
    render: (text) => <Badge>{text}</Badge>,
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

function NewsManagement() {
  const navigate = useNavigate();
  return (
    <Card className="m-6">
      <div className="flex justify-between mb-3">
        <div>
          <Input></Input>
        </div>
        <Button onClick={() => navigate("new")} type="primary">
          Thêm tin tức
        </Button>
      </div>
      <Table<News> columns={columns} dataSource={listNews} />
    </Card>
  );
}

export default NewsManagement;
