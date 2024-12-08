/** @format */

import { useEffect } from "react";
import "./main.css";

// import { ContractMethods } from "./Wagmi/contractMethods";
import { DashboardHeader } from "./pages/dashboard/dashboardHeader";
import { Content } from "./pages/dashboard/content";

export const Dashboard = () => {
  // const [maxSupply, setMaxSupply] = useState(0);

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
      <>
        <div className="dashboardMain">
          <Content />
        </div>
      </>
    </>
  );
};
