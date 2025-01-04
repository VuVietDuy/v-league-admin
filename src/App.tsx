import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import UserManagement from "./pages/UserManagement";
import ClubManagement from "./pages/ClubManagement";
import NewsManagement from "./pages/NewsManagement";
import PlayerManagement from "./pages/PlayerManagement";
import ClubDetails from "./pages/ClubDetails";
import PlayerDetails from "./pages/PlayerDetails";
import NewsDetails from "./pages/NewsDetails";
import Category from "./pages/Category";
import SeasonClubs from "./pages/SeasonClubs";
import Fixture from "./pages/Fixture";
import CurrentSeason from "./pages/CurrentSeason";
import Tables from "./pages/Tables";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./pages/Login";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="*"
            element={
              <RootLayout>
                <Routes>
                  <Route path="users" element={<UserManagement />} />
                  <Route path="category/:season" element={<Category />} />
                  <Route
                    path="current-season/:season"
                    element={<CurrentSeason />}
                  />
                  <Route path="fixture/:season" element={<Fixture />} />
                  <Route path="tables/:season" element={<Tables />} />
                  <Route
                    path="season-clubs/:season"
                    element={<SeasonClubs />}
                  />
                  <Route path="category/:season" element={<Category />} />
                  <Route path="players" element={<PlayerManagement />} />
                  <Route path="players/new" element={<PlayerDetails />} />
                  <Route path="clubs" element={<ClubManagement />} />
                  <Route path="clubs/new" element={<ClubDetails />} />
                  <Route path="news" element={<NewsManagement />} />
                  <Route path="news/new" element={<NewsDetails />} />
                </Routes>
              </RootLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
