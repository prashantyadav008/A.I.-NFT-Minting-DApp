/** @format */

import "./main.css";

import { Row, Col } from "react-bootstrap";

// import { ContractMethods } from "./Wagmi/contractMethods";
import { DashboardHeader } from "./pages/dashboard/dashboardHeader";
import { DashboardNav } from "./pages/dashboard/dashboardNav";
import { DashboardContent } from "./pages/dashboard/dashboardContent";

export const Dashboard = () => {
  return (
    <>
      <DashboardHeader />

      <Row
        className="dashboard-content text-center content"
        style={{ color: "#0e3464" }}>
        <Col>
          <h2 className="dashboardTitle fw-bold">Minting NFT</h2>
        </Col>
      </Row>

      <hr />
      <DashboardNav />
      <hr />

      <div className="dashboardMain">
        <DashboardContent />
      </div>
    </>
  );
};
