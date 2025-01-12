import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { ColumnsType } from "antd/lib/table";
import fetcher from "../../api/fetcher";
import { IClub } from "../../type/club";
import CreateMatch from "./CreateMatch";
import { DeleteOutlined, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface Match {
  id: number;
  homeClub: IClub;
  awayClub: IClub;
  stadium: string;
  date: string;
  time: string;
}

const Matches: React.FC = () => {
  // State quản lý danh sách lịch thi đấu
  const [matches, setMatches] = useState<Match[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetcher.get("matches").then((res) => {
      console.log(res);
      setMatches(res.data.data);
    });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteMatch = (id: number) => {};

  const columns: ColumnsType<Match> = [
    {
      title: "Đội chủ nhà",
      dataIndex: "homeClub",
      key: "homeClub",
      render: (_, record) => <p>{record.homeClub.name}</p>,
    },
    {
      title: "Đội khách",
      dataIndex: "awayClub",
      key: "awayClub",
      render: (_, record) => <p>{record.awayClub.name}</p>,
    },
    {
      title: "Ngày thi đấu",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Địa điểm",
      dataIndex: "stadium",
      key: "stadium",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Link to={`${record.id}`}>
            <Button type="primary" size="small">
              <PlusOutlined />
            </Button>
          </Link>
          <Button type="default" size="small" onClick={() => openModal()}>
            <EditFilled />
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa lịch này?"
            onConfirm={() => deleteMatch(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="default" size="small" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button
        type="primary"
        onClick={() => openModal()}
        style={{ marginBottom: 20 }}
      >
        Thêm Lịch Thi Đấu
      </Button>
      <Table dataSource={matches} columns={columns} rowKey="id" />
      <CreateMatch open={isModalOpen} onCancel={closeModal} />
    </div>
  );
};

export default Matches;
