import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import Dashboard from "./(tabs)/Dashboard";
import DashboardAdmin from "./DashboardAdmin";

export default function Index() {
  const roles = useSelector((state: RootState) => state.auth.roles);

  const isAdmin = roles.some((role) => role.includes("ADMIN"));

  return isAdmin ? <DashboardAdmin /> : <Dashboard />;
}
