/** @format */

import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

import Box from "@mui/material/Box";

export function Content() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");

  const handleGenerateImage = () => {
    // Placeholder for image generation logic
    var image = `https://via.placeholder.com/150?text=${encodeURIComponent("")}`;
    setGeneratedImage(image);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("Sybmitting ..........", name, description, generatedImage);
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

      <Row style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Col className="col-md-12 d-flex justify-content-center">
          <Col className="col-md-4  text-center" style={{ marginTop: "3rem" }}>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter NFT Name"
                style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter NFT Description"
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  width: "300px",
                  height: "80px",
                }}
              />
            </div>
            <button
              onClick={handleGenerateImage}
              style={{
                padding: "10px 20px",
                backgroundColor: "#0e3464",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}>
              Generate Image
            </button>

            <br />
            <br />

            <button
              onClick={submitHandler}
              className="btn btn-success"
              style={{
                padding: "10px 20px",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}>
              Mint NFT
            </button>
          </Col>
          <Col className="col-md-4">
            <div
              style={{
                border: "2px solid #0e3464",
                padding: "10px",
                minHeight: "350px",
                textAlign: "center",
              }}>
              {generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated NFT"
                  style={{ height: "350px", width: "100%" }}
                />
              ) : (
                "Generated image will appear here."
              )}
            </div>
          </Col>
        </Col>
      </Row>
    </>
  );
}
