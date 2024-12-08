/** @format */

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import satanaImage from "../../../assets/nftImage.jpg";
import ConnectWallet from "../../ConnectWallet";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  return (
    <Box className="dashboardHeader" sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#0e3464" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link to={"/"}>
            <img
              src={satanaImage}
              alt="NFT Minting"
              style={{ maxWidth: "20%" }}
            />
          </Link>

          <div className="connectWallet">
            <ConnectWallet />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
