import { Badge, Button, Card, Input, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { INews } from "../type/news";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fetcher from "../api/fetcher";

const columns: TableProps<INews>["columns"] = [
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
  const [newsData, setNewsData] = useState<INews[]>([]);

  useEffect(() => {
    fetcher.get("news").then((res) => {
      console.log(res);
      setNewsData(res.data);
    });
  }, []);

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
      <Table<INews> columns={columns} dataSource={newsData} />
    </Card>
  );
}

export default NewsManagement;
