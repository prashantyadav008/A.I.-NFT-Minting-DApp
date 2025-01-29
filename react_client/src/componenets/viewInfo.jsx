/** @format */

import "./main.css";

import { Row, Col } from "react-bootstrap";

// import { ContractMethods } from "./Wagmi/contractMethods";
import { DashboardHeader } from "./pages/dashboard/dashboardHeader";

import { InfoDashboard } from "./pages/view/infoDashboard";

export const ViewInfo = () => {
  return (
    <>
      <DashboardHeader />

      <Row
        className="dashboard-content text-center content"
        style={{ color: "#0e3464" }}>
        <Col>
          <h2 className="dashboardTitle fw-bold">View Minted NFT</h2>
        </Col>
      </Row>

      <div className="dashboardMain">
        <InfoDashboard />
      </div>
    </>
  );
};
