import { Badge, Button, Card, Input, Modal, Space, Table, message } from "antd";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { INews } from "@/type/news";
import fetcher from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";

const { confirm } = Modal;

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

  // Hàm xử lý xóa tin tức
  const handleDelete = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: <ExclamationCircleOutlined />,
      content: "Tin tức này sẽ bị xóa vĩnh viễn.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        fetcher
          .delete(`news/${id}`)
          .then(() => {
            message.success("Xóa tin tức thành công!");
            refetch(); // Cập nhật danh sách sau khi xóa
          })
          .catch(() => {
            message.error("Xóa thất bại! Vui lòng thử lại.");
          });
      },
    });
  };

  const columns: TableProps<INews>["columns"] = [
    {
      title: "Ảnh bìa",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) => <img src={text} width={60} />,
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
        <Space size="small">
          <Button onClick={() => navigate(`/news/${record.id}`)}>
            <EyeOutlined />
          </Button>
          <Button
            onClick={() => navigate(`/news/${record.id}/edit`)}
            type="primary"
          >
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
        <div className="flex gap-2">
          <Input
            onChange={(e) => setKey(e.target.value)}
            placeholder="Tìm kiếm"
          />
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
