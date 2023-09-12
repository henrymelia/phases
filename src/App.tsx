import { Outlet, Route, Routes } from "react-router-dom";
import ContentWithSidebarLayout from "./components/Layouts/ContentWithSidebarLayout";
import Sidebar from "./components/Sidebar";
import "./App.css";
import HomeContent from "./components/Pages/HomeContent";
import StartupProgress from "./components/Pages/StartupProgress";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ContentWithSidebarLayout
            sidebar={<Sidebar />}
            content={<Outlet />}
          />
        }
      >
        <Route index element={<HomeContent />} />
        <Route path=":id" element={<StartupProgress />} />
        <Route path="new" element={<span>new</span>} />
      </Route>
    </Routes>
  );
}

export default App;
