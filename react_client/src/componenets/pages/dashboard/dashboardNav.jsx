/** @format */

import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

// import Swal from "sweetalert2";

// import { ContractMethods } from "../../Wagmi/contractMethods";

export function DashboardNav() {
  const [mintPaused, setMintPaused] = useState();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    document
      .getElementById("loaderVisibilityFetching")
      .classList.add("is-active");

    try {
      // const contract = ContractMethods();
      // const minitingPausedResult = await contract.mintPaused();

      // console.log("minitingPausedResult", minitingPausedResult);

      setMintPaused(false);
      // setMintPaused(minitingPausedResult);
    } catch (e) {
      console.log("Nft not Minted --->>", e);
    }

    document
      .getElementById("loaderVisibilityFetching")
      .classList.remove("is-active");
  };

  return (
    <>
      <Row
        className="dashboard-content text-center content fw-bold"
        style={{ color: "#0e3464" }}>
        <Col>
          <h1 className="dashboardTitle">A.I. NFT Generator</h1>
        </Col>
      </Row>

      <Row className="text-center content fw-bold">
        <Col>
          <p className="dashboardSubTitle">
            <span className="dashboardSubTitleText">
              {mintPaused ? "Minting Paused" : "Minting Open"}
            </span>
          </p>
        </Col>
      </Row>
    </>
  );
}
