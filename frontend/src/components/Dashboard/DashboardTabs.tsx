import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ROUTES } from "../../common/constants";

const tabs = [
  { label: "Insights", path: `${ROUTES.INSIGHTS}` },
  {
    label: "Pending Actions",
    path: `${ROUTES.PENDING_ACTIONS}`,
  },
];

export default function DashboardTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = tabs.findIndex((tab) =>
    location.pathname.includes(tab.path)
  );
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(tabs[newValue].path);
  };

  return (
    <Box>
      <Tabs
        value={currentTab === -1 ? 0 : currentTab}
        onChange={handleChange}
        aria-label="dashboard sub-tabs"
      >
        {tabs.map((tab) => (
          <Tab key={tab.path} label={tab.label} />
        ))}
      </Tabs>

      {/* Outlet for nested routes */}
      <Outlet />
    </Box>
  );
}
