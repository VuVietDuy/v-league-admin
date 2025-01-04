import {
  Avatar,
  Button,
  Card,
  Input,
  Space,
  Table,
  TableProps,
  Popconfirm,
  message,
} from "antd";
import { IClub } from "../type/club";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fetcher from "../api/fetcher";

function ClubManagement() {
  const [clubs, setClubs] = useState<IClub[]>([]);
  const navigation = useNavigate();

  useEffect(() => {
    const getClubs = async () => {
      await fetcher
        .get("clubs")
        .then((res) => {
          setClubs(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getClubs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetcher.delete(`clubs/${id}`);
      setClubs((prevClubs) => prevClubs.filter((club) => club.id !== id));
      message.success("Câu lạc bộ đã được xóa thành công!");
    } catch (err) {
      message.error("Xóa câu lạc bộ thất bại!");
      console.log(err);
    }
  };

  const handleEdit = (id: number) => {
    navigation(`/clubs/${id}/edit`); // Redirect to edit page
  };

  const columns: TableProps<IClub>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Logo",
      key: "logo",
      render: (_, record) => (
        <Avatar shape="square" size="large" src={record.logoURL} />
      ),
    },
    {
      title: "Tên câu lạc bộ",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Sân vận động",
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
          <Button
            type="primary"
            size="small"
            onClick={() => handleEdit(record.id)}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa câu lạc bộ này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger size="small">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card className="m-6">
      <div className="flex justify-between mb-3">
        <div>
          <Input placeholder="Tìm kiếm câu lạc bộ" />
        </div>
        <Button onClick={() => navigation("new")} type="primary">
          Thêm câu lạc bộ
        </Button>
      </div>
      <Table<IClub> columns={columns} dataSource={clubs} rowKey="id" />
    </Card>
  );
}

export default ClubManagement;
