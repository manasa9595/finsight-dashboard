import { Routes, Route, Navigate } from "react-router-dom";

import DashboardTabs from "./Dashboard/DashboardTabs";
import PendingActions from "./Dashboard/PendingActions";
import Insights from "./Dashboard/Insights";
import OrdersContent from "./Orders/OrdersContent";
import { ROUTES } from "../common/constants";
import ProfileList from "./Profile/ProfileList";
import ProfilePage from "./Profile/ProfilePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={`/${ROUTES.DASHBOARD}/${ROUTES.PENDING_ACTIONS}`} />
        }
      />

      <Route path={`/${ROUTES.DASHBOARD}`} element={<DashboardTabs />}>
        <Route path={ROUTES.INSIGHTS} element={<Insights />} />
        <Route path={ROUTES.PENDING_ACTIONS} element={<PendingActions />} />
        <Route index element={<Navigate to={ROUTES.PENDING_ACTIONS} />} />
      </Route>

      <Route path={`/${ROUTES.ORDERS}`} element={<OrdersContent />} />
      <Route path={`/${ROUTES.PROFILE}`} element={<ProfileList />} />
      <Route path={`/${ROUTES.NEW_PROFILE}`} element={<ProfilePage />} />
    </Routes>
  );
}
