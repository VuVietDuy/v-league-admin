import React, { useState } from "react";
import { Table, Card, Typography } from "antd";

const { Title } = Typography;

// Dữ liệu giả lập cho bảng xếp hạng
const rankingData = [
  {
    key: "1",
    position: 1,
    team: "Hà Nội FC",
    matches: 20,
    wins: 14,
    draws: 4,
    losses: 2,
    goalDifference: 25,
    points: 46,
  },
  {
    key: "2",
    position: 2,
    team: "Hoàng Anh Gia Lai",
    matches: 20,
    wins: 12,
    draws: 5,
    losses: 3,
    goalDifference: 18,
    points: 41,
  },
  {
    key: "3",
    position: 3,
    team: "Viettel FC",
    matches: 20,
    wins: 11,
    draws: 6,
    losses: 3,
    goalDifference: 15,
    points: 39,
  },
  {
    key: "4",
    position: 4,
    team: "Sông Lam Nghệ An",
    matches: 20,
    wins: 9,
    draws: 7,
    losses: 4,
    goalDifference: 10,
    points: 34,
  },
  {
    key: "5",
    position: 5,
    team: "Bình Dương FC",
    matches: 20,
    wins: 8,
    draws: 6,
    losses: 6,
    goalDifference: 8,
    points: 30,
  },
];

const Tables: React.FC = () => {
  const [data, setData] = useState(rankingData);

  // Cấu hình các cột trong bảng
  const columns = [
    {
      title: "Hạng",
      dataIndex: "position",
      key: "position",
      render: (position: number) => (
        <strong style={{ color: position === 1 ? "gold" : undefined }}>
          {position}
        </strong>
      ),
    },
    {
      title: "Đội bóng",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Trận",
      dataIndex: "matches",
      key: "matches",
    },
    {
      title: "Thắng",
      dataIndex: "wins",
      key: "wins",
    },
    {
      title: "Hòa",
      dataIndex: "draws",
      key: "draws",
    },
    {
      title: "Thua",
      dataIndex: "losses",
      key: "losses",
    },
    {
      title: "Hiệu số",
      dataIndex: "goalDifference",
      key: "goalDifference",
    },
    {
      title: "Điểm",
      dataIndex: "points",
      key: "points",
      render: (points: number) => <strong>{points}</strong>,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Bảng Xếp Hạng V.League</Title>
      <Card>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </Card>
    </div>
  );
};

export default Tables;
