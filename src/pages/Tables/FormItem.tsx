import { IMatch } from "@/type/match";
import { formatDate } from "@/utils/formatDate";
import { Spin } from "antd";
import { Link, useParams } from "react-router-dom";

function FormItem({ match, clubId }: { match: IMatch; clubId: number }) {
  const { tournament } = useParams();
  let status = "B";
  if (match.homeScore > match.awayScore && clubId === match.homeClubId) {
    status = "T";
  }
  if (match.homeScore < match.awayScore && clubId === match.awayClubId) {
    status = "T";
  }
  if (match.homeScore === match.awayScore) {
    status = "H";
  }
  if (!match) {
    return <Spin />;
  }
  return (
    <div className="group relative">
      <div
        className={`rounded-full w-7 h-7  flex justify-center items-center hover:cursor-pointer 
        ${status === "T" && "bg-green-500"} 
        ${status === "B" && "bg-red-500"} 
        ${status === "H" && "bg-gray-400"}`}
      >
        <span className="text-sm font-bold text-white">{status}</span>
      </div>
      <Link
        to={`/match/${tournament}/${match.id}`}
        className="hidden group-hover:block absolute bottom-7 border h-20 py-2 px-3 w-60  right-0 rounded bg-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-600 hover:text-white hover:cursor-pointer"
      >
        <p className="text-center text-xs mb-2">{formatDate(match.date)}</p>
        <div className="mx-3">
          <div className="flex items-center justify-center gap-1">
            <span className="font-semibold text-lg">
              {match?.homeClub?.shortName}
            </span>
            <img
              className="w-8 h-8 object-cover"
              src={match?.homeClub?.logoURL}
              alt=""
            />
            <span className="px-2 py-1 rounded bg-purple-950 text-white font-semibold text-xs">
              {match?.homeScore}-{match?.awayScore}
            </span>
            <img
              className="w-8 h-8 object-cover"
              src={match?.awayClub?.logoURL}
              alt=""
            />
            <span className="font-semibold text-lg">
              {match?.awayClub?.shortName}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FormItem;
