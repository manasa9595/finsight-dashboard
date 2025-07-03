import * as React from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import type { Navigation } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

import { useLocation, useNavigate } from "react-router-dom";
import appLogo from "../assets/applogo.svg";
import AppRoutes from "./AppRoutes";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountBoxIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

export default function DashboardLayoutBranding() {
  const location = useLocation();
  const navigate = useNavigate();

  const router = React.useMemo(
    () => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      push: (url: string | URL) => navigate(url.toString()),
      navigate: (url: string | URL) => navigate(url.toString()),
    }),
    [location, navigate]
  );

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={appLogo} alt="App logo" style={{ width: "30px" }} />,
        title: "Finsight",
        homeUrl: "/",
      }}
      theme={demoTheme}
      router={router}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <AppRoutes />
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}
