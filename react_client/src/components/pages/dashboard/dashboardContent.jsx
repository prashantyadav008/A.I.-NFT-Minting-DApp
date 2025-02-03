/** @format */

import { useState } from "react";

import { Row, Col } from "react-bootstrap";

import axios from "axios";

import { PinataSDK } from "pinata-web3";

import Swal from "sweetalert2";

import { ContractMethods } from "../../Wagmi/contractMethods";

export function DashboardContent() {
  const [isAI_NFT, setIsAI_NFT] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [generatedImage, setGeneratedImage] = useState(""); // Stores preview URL
  const [fileType, setFileType] = useState(""); // Stores file type

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFileType(file.type); // Save the file type (e.g., image/png, video/mp4)
      const reader = new FileReader();
      reader.onload = (event) => {
        setGeneratedImage(event.target.result); // Save the file preview URL
      };
      reader.readAsDataURL(file); // Convert file to base64 URL
    }
  };

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
      setFileType("image/png");
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

  const base64ToBlob = (base64, mimeType) => {
    let byteCharacters = atob(base64.split(",")[1]); // Remove data URI scheme
    let byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    let byteArray = new Uint8Array(byteArrays);
    return new Blob([byteArray], { type: mimeType });
  };

  async function createURI() {
    // const extractedType = generatedImage.split(";")[0].split("/")[1];

    const pinata = new PinataSDK({
      // eslint-disable-next-line no-undef
      pinataJwt: process.env.REACT_APP_PINATA_JWT,
      pinataGateway: "example-gateway.mypinata.cloud",
    });

    const blob = base64ToBlob(generatedImage, fileType); // Convert base64 to Blob
    const file = new File([blob], name, { type: fileType });

    var result = await pinata.upload.file(file);
    console.log("Uploaded to IPFS: ", result.IpfsHash);

    if (result.IpfsHash) {
      let upload = await pinata.upload.json({
        name: "Pinnie NFT",
        description: "A Pinnie NFT from Pinata",
        // eslint-disable-next-line no-undef
        image: process.env.REACT_APP_PINATA_URL + result.IpfsHash,
      });

      console.log("upload --->>  ", upload.IpfsHash);

      if (upload.IpfsHash) {
        return upload;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "File Json not Upload on IPFS",
        });
        return false;
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "File not Upload on IPFS",
      });
      return false;
    }
  }

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

    if (generatedImage == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image Not Generated",
      });
      return false;
    }

    if (walletAddress == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wallet Address Not Found",
      });
      return false;
    }

    // show loader
    document.getElementById("loaderVisibility").classList.add("is-active");

    let uri = await createURI();
    // eslint-disable-next-line no-undef
    uri = process.env.REACT_APP_PINATA_URL + uri.IpfsHash;

    console.log("uri ---->>>", uri);

    try {
      const contract = ContractMethods();
      const response = await contract.mintNFT(walletAddress, uri);

      if (response.status) {
        setIsAI_NFT(false);
        setName("");
        setDescription("");
        setWalletAddress("");
        setGeneratedImage("");
        setFileType("");

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

    document.getElementById("loaderVisibility").classList.remove("is-active");
  };

  return (
    <>
      <Row>
        {/* Radio Button */}
        <Col className="d-flex justify-content-center">
          <Col className="col-md-5  text-center">
            <label>
              <input
                type="radio"
                value="false"
                checked={isAI_NFT === false}
                onChange={() => setIsAI_NFT(false)}
              />{" "}
              Upload Image
            </label>{" "}
            <label>
              <input
                type="radio"
                value="true"
                checked={isAI_NFT === true}
                onChange={() => setIsAI_NFT(true)}
              />{" "}
              Generate Image
            </label>
          </Col>
        </Col>

        {!isAI_NFT ? (
          <Row style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <Col className="col-md-12 d-flex justify-content-center">
              <Col
                className="col-md-5  text-center"
                style={{ marginTop: "3rem" }}>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter NFT Name"
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "410px",
                    }}
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
                      width: "410px",
                      height: "80px",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="file"
                    accept="image/*,video/*,application/pdf" // Accept only images, videos, and PDFs
                    onChange={handleFileChange}
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "410px",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter Wallet Address"
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "410px",
                    }}
                  />
                </div>

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
                  {generatedImage !== "" ? (
                    fileType.startsWith("image/") ? (
                      // For Images
                      <img
                        src={generatedImage}
                        alt="Selected File"
                        style={{
                          height: "320px",
                          width: "100%",
                        }}
                      />
                    ) : fileType.startsWith("video/") ? (
                      // For Videos
                      <video
                        controls
                        style={{ height: "320px", width: "100%" }}>
                        <source src={generatedImage} type={fileType} />
                        Your browser does not support the video tag.
                      </video>
                    ) : fileType === "application/pdf" ? (
                      // For PDFs
                      <iframe
                        src={generatedImage}
                        title="PDF Preview"
                        style={{ height: "320px", width: "100%" }}
                      />
                    ) : (
                      // For unsupported types
                      <p>Unsupported file type selected.</p>
                    )
                  ) : (
                    "Selected File will appear here."
                  )}
                </div>
              </Col>
            </Col>
          </Row>
        ) : (
          <Row style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <Col className="col-md-12 d-flex justify-content-center">
              <Col
                className="col-md-5  text-center"
                style={{ marginTop: "3rem" }}>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter NFT Name"
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "410px",
                    }}
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
                      width: "410px",
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

                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter Wallet Address"
                    style={{
                      padding: "5px",
                      width: "410px",
                    }}
                  />
                  <br />
                </div>

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
        )}
      </Row>
    </>
  );
}
