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
import { IClub } from "@/type/club";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import fetcher from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function ClubList() {
  const navigation = useNavigate();
  const [key, setKey] = useState("");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_LIST_CLUBS"],
    queryFn: async () => {
      let params = {};
      if (key) {
        params = { ...params, key: key };
      }
      return fetcher.get("clubs", { params: params }).then((res) => res.data);
    },
  });

  useEffect(() => {
    refetch();
  }, [key]);

  const handleDelete = async (id: number) => {
    try {
      await fetcher.delete(`clubs/${id}`);
      refetch();
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
      render: (_, record) => (
        <NavLink to={`${record.id}`}>{record.name}</NavLink>
      ),
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
        <div className="flex gap-2">
          <Input
            onChange={(e) => setKey(e.target.value)}
            placeholder="Tìm kiếm"
          ></Input>
        </div>
        <Button onClick={() => navigation("/clubs/new")} type="primary">
          Thêm câu lạc bộ
        </Button>
      </div>
      {isLoading && <LoadingOutlined></LoadingOutlined>}
      {data && (
        <Table<IClub> columns={columns} dataSource={data || []} rowKey="id" />
      )}
    </Card>
  );
}

export default ClubList;
