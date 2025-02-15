import { Badge, Button, Card, Input, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { INews } from "@/type/news";
import fetcher from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";

function NewsList() {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const { data: newsData, refetch } = useQuery({
    queryKey: ["GET_LIST_NEWS"],
    queryFn: async () => {
      let params = {};
      if (key) {
        params = { ...params, key: key };
      }
      return fetcher.get("news", { params: params }).then((res) => res.data);
    },
  });

  useEffect(() => {
    refetch();
  }, [key]);

  
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
    dataIndex: "tag",
    key: "tag",
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


  return (
    <Card className="m-6">
      <div className="flex justify-between mb-3">
        <div className="flex gap-2">
          <Input
            onChange={(e) => setKey(e.target.value)}
            placeholder="Tìm kiếm"
          ></Input>
        </div>
        <Button onClick={() => navigate("new")} type="primary">
          Thêm tin tức
        </Button>
      </div>
      <Table<INews> rowKey="id" columns={columns} dataSource={newsData} />
    </Card>
  );
}

export default NewsList;
