import React, { useEffect, useState } from "react";
import { Table, Card, Typography, Row, Col, Statistic, Select } from "antd";
import { Link, useParams } from "react-router-dom";
import fetcher from "../api/fetcher";
import { IClub } from "../type/club";

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

interface TablesItem {
  position?: number;
  club: IClub;
  played?: number;
  won?: number;
  drawn?: number;
  lost?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference: number;
  points: number;
}

const CurrentSeason: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const { tournament } = useParams();
  const [tables, setTables] = useState<TablesItem[]>([]);
  const [topScorer, setTopScorer] = useState<TablesItem>();
  const [totalMatches, setTotalMatches] = useState<number>();

  useEffect(() => {
    fetcher.get(`tournaments/${tournament}/dashboard`).then((res) => {
      console.log(res);
      setTables(res.data.data.tables);
      setTopScorer(res.data.data.topScorer);
      setTotalMatches(res.data.data.totalMatches);
    });
  }, []);
  console.log(tournament);

  const handleTeamSelect = (value: string) => {
    setSelectedTeam(value);
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="flex justify-between">
        <Title level={2}>Thống Kê Mùa Giải</Title>
        <div>
          <Link className="btn" to={`/new-season/${tournament}`}>
            Mùa giải mới
          </Link>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng số trận" value={totalMatches} />
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
              value={topScorer?.club.name}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold">
                Thứ hạng
              </th>
              <th scope="col" className="px-6 py-3">
                Câu lạc bộ
              </th>
              <th scope="col" className="px-3 py-3 w-fit">
                Trận
              </th>
              <th scope="col" className="px-3 py-3">
                Thắng
              </th>
              <th scope="col" className="px-3 py-3">
                Hòa
              </th>
              <th scope="col" className="px-3 py-3">
                Thua
              </th>
              <th scope="col" className="px-3 py-3">
                BT-BB
              </th>
              <th scope="col" className="px-3 py-3">
                HS
              </th>
              <th scope="col" className="px-3 py-3">
                BTSK
              </th>
              <th scope="col" className="px-3 py-3  hidden lg:block">
                Gần đây
              </th>
              <th scope="col" className="px-6 py-3">
                Điểm
              </th>
            </tr>
          </thead>
          <tbody>
            {tables.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 border-b dark:border-gray-700"
              >
                <td className="px-6 py-2 relative">
                  {index <= 3 && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#1b39f5]"></div>
                  )}
                  {index == 4 && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#ff6900]"></div>
                  )}
                  {index == 5 && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#00be14]"></div>
                  )}
                  {index + 1}
                </td>
                <td className="px-6 py-2 flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={item.club.logoURL}
                    alt=""
                  />
                  <span className="font-semibold">{item.club.name}</span>
                </td>
                <td className="px-6 py-2">{item.played}</td>
                <td className="px-6 py-2">{item.won}</td>
                <td className="px-6 py-2">{item.drawn}</td>
                <td className="px-6 py-2">{item.lost}</td>
                <td className="px-6 py-2">{item.goalsFor}</td>
                <td className="px-6 py-2">{item.goalsAgainst}</td>
                <td className="px-6 py-2">{item.goalDifference}</td>
                <td className="px-6 py-2 hidden lg:block"></td>
                <td className="px-6 py-2 font-bold text-red-600">
                  {item.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default CurrentSeason;
