/** @format */

import { useState } from "react";

import { Row } from "react-bootstrap";

import Swal from "sweetalert2";

import { ContractMethods } from "../../Wagmi/contractMethods";

export function InfoDashboard() {
  const [walletAddress, setWalletAddress] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (walletAddress == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wallet Address Not Found",
      });
      return false;
    }

    try {
      setUserDetails([]);
      setIsPending(true);

      const contract = ContractMethods();
      const response = await contract.getUserDetails(walletAddress);

      if (response.status) {
        setUserDetails(response.result);
      } else {
        setUserDetails([]);
      }
    } catch (e) {
      console.log("Nft not Minted --->>", e);
    }

    setIsPending(false);
  };

  const withdrawalNFT = async (key, walletAddress, nftId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Withdraw it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        document.getElementById("loaderVisibility").classList.add("is-active");

        try {
          // show loader
          const contract = ContractMethods();
          const response = await contract.withdrawalNFT(walletAddress, nftId);

          if (response.status) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: response.message,
            });

            let newArr = userDetails.filter((_, index) => index !== key);

            console.log("userDetails1111222 --->>", newArr);
            setUserDetails(newArr);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
            });
          }
        } catch (e) {
          console.log("Nft not Minted --->>", e);
          document
            .getElementById("loaderVisibility")
            .classList.remove("is-active");
        }

        document
          .getElementById("loaderVisibility")
          .classList.remove("is-active");
      }
    });
  };

  return (
    <>
      <Row className="text-center content d-flex justify-content-center">
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
          style={{
            padding: "10px 20px",
            backgroundColor: "#0e3464",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "fit-content",
          }}>
          Get Details
        </button>
      </Row>

      <hr />

      {isPending && (
        <div className="mt-5 text-center content d-flex justify-content-center fw-bold">
          Loading...
        </div>
      )}

      {userDetails.length > 0 && (
        <Row className="mt-5 text-center content d-flex justify-content-center">
          <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">NFT ID</th>
                  <th scope="col">Minted Cost</th>
                  <th scope="col">Minted At</th>
                  <th scope="col">NFT</th>
                  <th scope="col">Withdrawal Amount</th>
                </tr>
              </thead>

              <tbody>
                {userDetails.length > 0 ? (
                  userDetails.map((item, key) => (
                    <tr key={key + 1}>
                      <th scope="row">{key + 1}</th>
                      <td>{item.nftId} </td>
                      <td>
                        {item.mintedCost > 999999999999
                          ? item.mintedCost / 1e18 + " ETH"
                          : item.mintedCost + " Wei"}
                      </td>
                      <td>{item.mintedAt}</td>
                      <td>{item.tokenURI}</td>
                      <td>
                        <ul className="list-inline m-0">
                          <li className="list-inline-item">
                            <button
                              className="btn btn-danger"
                              type="button"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                              // eslint-disable-next-line no-unused-vars
                              onClick={(e) =>
                                withdrawalNFT(key, walletAddress, item.nftId)
                              }>
                              <i className="fa fa-pencil">Withdraw</i>
                            </button>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No Data Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Row>
      )}
    </>
  );
}
