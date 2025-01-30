/** @format */

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import satanaImage from "../../../assets/nftImage.jpg";
import ConnectWallet from "../../ConnectWallet";
import { Link } from "react-router-dom";

import { Col } from "react-bootstrap";

export function DashboardHeader() {
  return (
    <Box className="dashboardHeader" sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#0e3464" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Col className="col-md-4">
            <Link to={"/"}>
              <img
                src={satanaImage}
                alt="NFT Minting"
                style={{ maxWidth: "20%" }}
              />
            </Link>
          </Col>

          <Col className="col-md-4 text-end">
            <Link
              to={"/"}
              style={{
                color: "#ffffff",
                textDecoration: "none",
                textAlign: "end",
              }}>
              Mint NFT
            </Link>
            <Link
              to={"/viewMintedNFT"}
              style={{
                color: "#ffffff",
                textDecoration: "none",
                textAlign: "end",
                marginLeft: "30px",
              }}>
              View Minted NFT
            </Link>
          </Col>

          <div className="connectWallet text-end">
            <ConnectWallet />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
