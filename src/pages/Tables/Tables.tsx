import { useEffect } from "react";

import { Link, useParams, useSearchParams } from "react-router-dom";
import { Card, Dropdown, Spin } from "antd";
import { IClub } from "../../type/club";
import fetcher from "../../api/fetcher";
import { IMatch } from "@/type/match";
import FormItem from "./FormItem";
import { DownOutlined, ReloadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";

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
  form: IMatch[];
}

function Tables() {
  const { tournament: tournamentId } = useParams();
  const [searchParams] = useSearchParams();
  const seasonId = searchParams.get("seasonId");

  const {
    data: tables,
    isLoading: isLoadingTables,
    refetch: refetchTables,
  } = useQuery({
    queryKey: ["GET_TABLES"],
    queryFn: async () => {
      let params = {};
      if (seasonId) {
        params = {
          seasonId: seasonId,
        };
      }
      return fetcher
        .get(`tournaments/${tournamentId}/tables`, { params: params })
        .then((res) => res.data);
    },
  });

  const {
    data: seasonsData,
    isLoading: isLoadingSeasonsData,
    refetch: refetchSeasonsData,
  } = useQuery({
    queryKey: ["GET_LISTS_SEASON_FOR_RESULTS_PAGE"],
    queryFn: () =>
      fetcher
        .get(`tournaments/${tournamentId}/seasons`)
        .then((res) => res.data),
  });

  useEffect(() => {
    refetchTables();
    refetchSeasonsData();
  }, [tournamentId]);
  return (
    <Card className="m-6">
      <div className="flex border rounded-sm mb-6">
        <Dropdown
          menu={{
            items: isLoadingSeasonsData
              ? []
              : seasonsData.map((season: any, index: number) => ({
                  key: index,
                  label: (
                    <a
                      className="hover:text-purple-800 text-wrap w-28"
                      href={`?seasonId=${season.id}`}
                    >
                      {season.name.split(" ").slice(-1)[0]}
                    </a>
                  ),
                })),
          }}
        >
          <div
            className="w-fit px-3 py-2 flex gap-8 border-r"
            onClick={(e) => e.preventDefault()}
          >
            <div>
              <p className="text-[10px]">Lọc theo mùa giải</p>
              <p>
                {seasonId === null || (isLoadingSeasonsData && <Spin />)}
                {seasonId !== null && !isLoadingSeasonsData
                  ? seasonsData
                      .filter((season: any) => season.id === +seasonId)[0]
                      .name.split(" ")
                      .slice(-1)[0]
                  : !isLoadingSeasonsData &&
                    seasonsData
                      .filter((season: any) => season.isActive)[0]
                      .name.split(" ")
                      .slice(-1)[0]}
              </p>
            </div>
            <DownOutlined className="text-xs" />
          </div>
        </Dropdown>
        <Link
          className="px-3 flex items-center gap-2 hover:text-purple-900"
          to=""
        >
          <ReloadOutlined /> Xóa bộ lọc
        </Link>
      </div>
      {isLoadingTables ? (
        <Loading />
      ) : (
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
            {tables.map((item: TablesItem, index: number) => (
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
                <td className="px-6 py-2 hidden lg:block">
                  <div className="h-full flex items-center gap-2">
                    {item.form.map((match, index) => (
                      <FormItem
                        match={match}
                        clubId={item.club.id}
                        key={index}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-2 font-bold text-red-600">
                  {item.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

export default Tables;
