import { Route, Routes } from "react-router-dom";
import Matches from "./Matches";
import MatchDetail from "./MatchDetail";

export default function Fixture() {
  return (
    <Routes>
      <Route path="" element={<Matches />} />
      <Route path=":matchId" element={<MatchDetail />} />
    </Routes>
  );
}
