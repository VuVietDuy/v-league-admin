import { useState } from "react";
import { Card } from "antd";

import MatchEvents from "./MatchEvents/MatchEvents";
import MatchLineups from "./MatchLineups/MatchLineups";
import MatchStats from "./MatchStats";
import MatchOverview from "./MatchOverview";

export default function MatchDetail() {
  const [tab, setTab] = useState("MatchOverview");
  return (
    <Card className="m-6">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <a
            className={`inline-block p-4 rounded-t-lg cursor-pointer ${
              tab === "MatchOverview"
                ? "text-blue-600 bg-gray-100"
                : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
            onClick={() => setTab("MatchOverview")}
          >
            Thông tin chung
          </a>
        </li>
        <li className="me-2">
          <a
            className={`inline-block p-4 rounded-t-lg cursor-pointer ${
              tab === "MacthEvents"
                ? "text-blue-600 bg-gray-100"
                : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
            onClick={() => setTab("MacthEvents")}
          >
            Sự kiện
          </a>
        </li>
        <li className="me-2">
          <a
            className={`inline-block p-4 rounded-t-lg cursor-pointer ${
              tab === "MatchLineups"
                ? "text-blue-600 bg-gray-100"
                : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
            onClick={() => setTab("MatchLineups")}
          >
            Đội hình
          </a>
        </li>
        <li className="me-2">
          <a
            className={`inline-block p-4 rounded-t-lg cursor-pointer ${
              tab === "MatchStats"
                ? "text-blue-600 bg-gray-100"
                : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
            onClick={() => setTab("MatchStats")}
          >
            Thống kê
          </a>
        </li>
      </ul>

      {tab === "MatchOverview" && <MatchOverview />}
      {tab === "MacthEvents" && <MatchEvents />}
      {tab === "MatchLineups" && <MatchLineups />}
      {tab === "MatchStats" && <MatchStats />}
    </Card>
  );
}
