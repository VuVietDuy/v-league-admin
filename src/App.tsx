import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "@/store/store";
import RootLayout from "@/components/RootLayout";
import UserList from "@/pages/User/UserList";
import ClubDetail from "@/pages/Club/ClubDetail";
import ClubList from "@/pages/Club/ClubList";
import PlayersList from "@/pages/Player/PlayerList";
import Tables from "@/pages/Tables/Tables";
import ClubCreate from "@/pages/Club/ClubCreate";
import NewsList from "@/pages/News/NewsList";
import CreateSeason from "@/pages/Season/CreateSeason";
import CurrentSeason from "@/pages/Season/CurrentSeason";
import PlayerCreate from "@/pages/Player/PlayerCreate";
import PlayerDetail from "@/pages/Player/PlayerDetail";
import NewsCreate from "@/pages/News/NewsCreate";
import NewsEdit from "@/pages/News/NewsEdit";
import CategoryList from "@/pages/Category/CategoryList";
import ClubEdit from "@/pages/Club/ClubEdit";
import MatchList from "@/pages/Match/MatchList";
import MatchDetail from "@/pages/Match/MatchDetail/MatchDetail";
import SeasonClubs from "@/pages/Season/SeasonClubs/SeasonClubs";
import Login from "./pages/Auth/Login";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<RootLayout />}>
                <Route path="/users" element={<UserList />} />
                <Route
                  path="/category/:tournament"
                  element={<CategoryList />}
                />
                <Route
                  path="/new-season/:tournament"
                  element={<CreateSeason />}
                />
                <Route
                  path="/current-season/:tournament"
                  element={<CurrentSeason />}
                />
                <Route path="/match/:tournament/" element={<MatchList />} />
                <Route
                  path="/match/:tournament/:matchId"
                  element={<MatchDetail />}
                />
                <Route path="/tables/:tournament" element={<Tables />} />
                <Route
                  path="/season-clubs/:tournament"
                  element={<SeasonClubs />}
                />
                <Route path="/players" element={<PlayersList />} />
                <Route path="/players/new" element={<PlayerCreate />} />
                <Route path="/players/:playerId" element={<PlayerDetail />} />
                <Route path="/clubs" element={<ClubList />} />
                <Route path="/clubs/new" element={<ClubCreate />} />
                <Route path="/clubs/:clubId" element={<ClubDetail />} />
                <Route path="/clubs/:clubId/edit" element={<ClubEdit />} />
                <Route path="/news" element={<NewsList />} />
                <Route path="/news/new" element={<NewsCreate />} />
                <Route path="/news/:newsId/edit" element={<NewsEdit />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
