import fetcher from "@/api/fetcher";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function MatchStats() {
  const { matchId } = useParams();

  const { data: matchStatsData, isLoading } = useQuery({
    queryKey: ["GET_DETAILS_MATCH"],
    queryFn: () =>
      fetcher.get(`matches/${matchId}/stats`).then((res) => res.data),
  });
  console.log(matchStatsData);

  if (isLoading) {
    return <Loading />;
  }

  const matchStats = [
    {
      homeClub: matchStatsData.homeClub.possession,
      parameter: "Tỉ lệ cầm bóng",
      awayClub: matchStatsData.awayClub.possession,
    },
    {
      homeClub: matchStatsData.homeClub.shotsOnTargett,
      parameter: "Dứt điểm trúng đích",
      awayClub: matchStatsData.awayClub.shotsOnTargett,
    },
    {
      homeClub: matchStatsData.homeClub.shots,
      parameter: "Dứt điểm",
      awayClub: matchStatsData.awayClub.shots,
    },
    {
      homeClub: matchStatsData.homeClub.touches,
      parameter: "Tắc bóng",
      awayClub: matchStatsData.awayClub.touches,
    },
    {
      homeClub: matchStatsData.homeClub.passes,
      parameter: "Qua người",
      awayClub: matchStatsData.awayClub.passes,
    },
    {
      homeClub: matchStatsData.homeClub.yellowCards,
      parameter: "Thẻ vảng",
      awayClub: matchStatsData.awayClub.yellowCards,
    },
    {
      homeClub: matchStatsData.homeClub.redCards,
      parameter: "Thẻ đỏ",
      awayClub: matchStatsData.awayClub.redCards,
    },
    {
      homeClub: matchStatsData.homeClub.foulsConceded,
      parameter: "Phản lưới",
      awayClub: matchStatsData.awayClub.foulsConceded,
    },
  ];

  return (
    <div>
      <h1 className="my-6 text-xl font-bold text-center">Thống kê trận đấu</h1>
      <table className="w-full border rounded">
        <thead className="border-b">
          <th className="w-[33%] py-4">
            <div className=" flex items-center justify-center gap-2">
              <h2 className="text-nowrap font-bold text-base">
                {matchStatsData?.homeClub.name}
              </h2>
              <img
                className="w-8 h-8"
                src={matchStatsData?.homeClub.logoURL}
                alt=""
              />
            </div>
          </th>
          <th className="w-[33%] py-4"></th>
          <th className="w-[33%] py-4">
            <div className=" flex items-center justify-center gap-2">
              <img
                className="w-8 h-8"
                src={matchStatsData?.awayClub.logoURL}
                alt=""
              />
              <h2 className="text-nowrap font-bold text-base">
                {matchStatsData?.awayClub.name}
              </h2>
            </div>
          </th>
        </thead>
        <tbody>
          {matchStats.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 === 1 ? "bg-gray-100" : ""}`}
            >
              <td className="w-[33%] text-center py-3">{row.homeClub}</td>
              <td className="w-[33%] text-center py-3">{row.parameter}</td>
              <td className="w-[33%] text-center py-3">{row.awayClub}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
