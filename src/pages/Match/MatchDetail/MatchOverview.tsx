import { useEffect } from "react";
import { useParams } from "react-router-dom";

import fetcher from "@/api/fetcher";
import { formatDate } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryKeys";
import { renderMatchStatus } from "@/utils/renderMatchStatus";
import MatchImages from "./MatchImages";

export default function MatchOverview() {
  const { matchId } = useParams();
  const { data: match } = useQuery({
    queryKey: [queryKeys.GET_MATCH_OVERVIEW, matchId],
    queryFn: async () =>
      fetcher.get(`matches/${matchId}`).then((res) => res.data),
  });

  useEffect(() => {}, []);

  return (
    <div className="mt-4">
      {match && (
        <>
          <div className="flex justify-between mb-6">
            <div className="flex gap-4 items-center">
              <img className="w-14" src={match?.homeClub?.logoURL} alt="" />
              <h2 className="text-2xl">{match?.homeClub?.name}</h2>
            </div>
            <p className="text-4xl text-white font-bold px-5 py-3 bg-purple-950 rounded-b-lg">
              {match?.homeScore || 0} - {match?.awayScore || 0}
            </p>
            <div className="flex gap-4 items-center">
              <h2 className="text-2xl">{match?.awayClub?.name}</h2>
              <img className="w-14" src={match?.awayClub?.logoURL} alt="" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1 flex items-center">
              <label className="label w-40" htmlFor="date">
                Ngày thi đấu:
              </label>
              <p className="text-lg">{formatDate(match.date)}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <label className="label w-40" htmlFor="date">
                Giờ thi đấu:
              </label>
              <p className="text-lg">{match.time}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <label className="label w-40" htmlFor="date">
                Sân vận động:
              </label>
              <p className="text-lg">{match.stadium}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <label className="label w-40" htmlFor="date">
                Trọng tài:
              </label>
              <p className="text-lg">{match.referee}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <label className="label w-40" htmlFor="date">
                Trạng thái:
              </label>
              <p className="text-lg">{renderMatchStatus(match.status)}</p>
            </div>
          </div>
          <div>
            <MatchImages />
          </div>
        </>
      )}
    </div>
  );
}
