import React, { useState } from "react";
import { Table, Card, Typography, Row, Col, Statistic, Select } from "antd";

const { Title } = Typography;
const { Option } = Select;

// Dữ liệu giả lập
const matchStats = [
  {
    id: 1,
    team: "Đội A",
    matches: 10,
    wins: 7,
    draws: 2,
    losses: 1,
    goals: 20,
  },
  {
    id: 2,
    team: "Đội B",
    matches: 10,
    wins: 5,
    draws: 3,
    losses: 2,
    goals: 18,
  },
  {
    id: 3,
    team: "Đội C",
    matches: 10,
    wins: 3,
    draws: 4,
    losses: 3,
    goals: 12,
  },
  { id: 4, team: "Đội D", matches: 10, wins: 2, draws: 2, losses: 6, goals: 8 },
];

const seasonStats = {
  totalMatches: 20,
  totalGoals: 58,
  topScorer: "Đội A",
};

const CurrentSeason: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  // Cột của bảng thống kê
  const columns = [
    {
      title: "Đội bóng",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Số trận",
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
      title: "Bàn thắng",
      dataIndex: "goals",
      key: "goals",
    },
  ];

  // Xử lý chọn đội bóng
  const handleTeamSelect = (value: string) => {
    setSelectedTeam(value);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Thống Kê Mùa Giải</Title>

      {/* Thống kê tổng quan */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng số trận" value={seasonStats.totalMatches} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số bàn thắng"
              value={seasonStats.totalGoals}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Đội ghi nhiều bàn nhất"
              value={seasonStats.topScorer}
            />
          </Card>
        </Col>
      </Row>

      {/* Bảng thống kê chi tiết */}
      <Card style={{ marginBottom: 20 }}>
        <Table
          dataSource={matchStats}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* Thống kê theo đội bóng */}
      <Card>
        <Title level={4}>Xem Thống Kê Theo Đội Bóng</Title>
        <Select
          placeholder="Chọn đội bóng"
          style={{ width: "100%", marginBottom: 20 }}
          onChange={handleTeamSelect}
        >
          {matchStats.map((team) => (
            <Option key={team.id} value={team.team}>
              {team.team}
            </Option>
          ))}
        </Select>

        {selectedTeam ? (
          <Card>
            <Title level={5}>Thống Kê Chi Tiết - {selectedTeam}</Title>
            {matchStats
              .filter((team) => team.team === selectedTeam)
              .map((team) => (
                <div key={team.id}>
                  <p>Số trận: {team.matches}</p>
                  <p>Thắng: {team.wins}</p>
                  <p>Hòa: {team.draws}</p>
                  <p>Thua: {team.losses}</p>
                  <p>Bàn thắng: {team.goals}</p>
                </div>
              ))}
          </Card>
        ) : (
          <p>Chọn một đội bóng để xem chi tiết.</p>
        )}
      </Card>
    </div>
  );
};

export default CurrentSeason;
