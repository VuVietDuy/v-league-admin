import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import fetcher from "../api/fetcher";
import { IClub } from "../type/club";
import { Card } from "antd";

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

function Tables() {
  const [data, setData] = useState<TablesItem[]>([]);
  const { tournament } = useParams();
  console.log(tournament);

  useEffect(() => {
    fetcher.get(`tournaments/${tournament}/tables`).then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, []);
  return (
    <Card className="m-6">
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
          {data.map((item, index) => (
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
  );
}

export default Tables;
