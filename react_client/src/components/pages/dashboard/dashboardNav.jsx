/** @format */

import { Row, Col } from "react-bootstrap";

import { WagmiContractConfig } from "../../Wagmi/wagmiContractConfig";

import { useReadContracts } from "wagmi";

export function DashboardNav() {
  const { data, error, isPending } = useReadContracts({
    contracts: [
      {
        ...WagmiContractConfig,
        functionName: "mintPaused",
      },
      {
        ...WagmiContractConfig,
        functionName: "mintPrice",
      },
      {
        ...WagmiContractConfig,
        functionName: "totalNFT",
      },
    ],
  });

  var [mintPaused, mintPrice, totalNFT] = data || [];

  if (!isPending) {
    mintPaused = mintPaused?.result;
    mintPrice = Number(mintPrice?.result);
    totalNFT = Number(totalNFT?.result);
  }

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.shortMessage || error.message}</div>;

  return (
    <>
      <Row className="text-center content d-flex justify-content-center">
        <Col md="4">
          <p className="dashboardSubTitle">
            <span className="dashboardSubTitleText">
              <b>Mint Status:</b> {mintPaused ? "Closed" : "Open"}
            </span>
          </p>
        </Col>
        <Col md="4">
          <p className="dashboardSubTitle">
            <span className="dashboardSubTitleText">
              <b>Minting Price (per NFT):</b>{" "}
              {mintPrice > 999999999999
                ? mintPrice / 1e18 + " ETH"
                : mintPrice + " Wei"}
            </span>
          </p>
        </Col>
        <Col md="4">
          <p className="dashboardSubTitle">
            <span className="dashboardSubTitleText">
              <b>Total NFT Minted:</b> {totalNFT}
            </span>
          </p>
        </Col>
      </Row>
    </>
  );
}
