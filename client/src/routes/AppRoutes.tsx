import { Routes, Route } from "react-router-dom";
import Layout from "../shared/components/Layout";
import DashboardPage from "../dashboard/components/DashboardPage";
import ReportsPage from "../dashboard/components/ReportsPage";
import SettingsPage from "../dashboard/components/SettingsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
