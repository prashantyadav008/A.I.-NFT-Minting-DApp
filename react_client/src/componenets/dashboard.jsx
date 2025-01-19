/** @format */

import { useEffect } from "react";
import "./main.css";

// import { ContractMethods } from "./Wagmi/contractMethods";
import { DashboardHeader } from "./pages/dashboard/dashboardHeader";
import { DashboardNav } from "./pages/dashboard/dashboardNav";
import { DashboardContent } from "./pages/dashboard/dashboardContent";

export const Dashboard = () => {
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    document
      .getElementById("loaderVisibilityFetching")
      .classList.add("is-active");

    try {
      // var contract = ContractMethods();
      // let ownerOf = await contract.ownerOf(1);
      // console.log("ownerOf", ownerOf);
    } catch (error) {
      console.error("Error fetching:", error);
    }

    document
      .getElementById("loaderVisibilityFetching")
      .classList.remove("is-active");
  };

  return (
    <>
      <DashboardHeader />

      <DashboardNav />

      <div className="dashboardMain">
        <DashboardContent />
      </div>
    </>
  );
};
