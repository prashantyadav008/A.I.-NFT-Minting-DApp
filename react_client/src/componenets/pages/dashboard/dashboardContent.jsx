/** @format */

import { useState } from "react";

import { Row, Col } from "react-bootstrap";

import axios from "axios";
import Swal from "sweetalert2";

import { ContractMethods } from "../../Wagmi/contractMethods";

export function DashboardContent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  // const [uri, setUri] = useState("");

  const handleGenerateImage = async () => {
    if (name == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill the Name fields",
      });
      return false;
    }

    if (description == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill the Description fields",
      });
      return false;
    }
    // Placeholder for image generation logic
    var image = `https://via.placeholder.com/150?text=${encodeURIComponent("Waiting for image...")}`;
    setGeneratedImage(image);

    try {
      const response = await axios({
        url: `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`,
        method: "POST",
        headers: {
          // eslint-disable-next-line no-undef
          Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          inputs: description,
          options: { wait_for_modal: true },
        }),
        responseType: "arraybuffer",
      });

      const type = response.headers["content-type"];
      const data = response.data;

      // eslint-disable-next-line no-undef
      const base64data = Buffer.from(data).toString("base64");
      image = `data:${type};base64,` + base64data;
    } catch (e) {
      image = "";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Someting went Wrong!, Image Not Generated",
      });
      console.log("image not generated", e);
    }

    setGeneratedImage(image);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (name == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill the Name fields",
      });
      return false;
    }

    if (description == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill the Description fields",
      });
      return false;
    }

    if (name == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill the Name fields",
      });
      return false;
    }

    if (generatedImage == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image Not Generated",
      });
      return false;
    }

    try {
      const contract = ContractMethods();
      const response = await contract.mintNFT("walletAddress", "uri");

      if (response.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.message,
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Someting went Wrong!, Image Not Mintend",
      });

      console.log("Nft not Minted --->>", e);
    }
  };

  return (
    <>
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
