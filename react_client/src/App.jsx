/** @format */

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import pagenot found component

import { Dashboard } from "./components/dashboard.jsx";
import { ViewInfo } from "./components/viewInfo.jsx";
import { PageNotFound } from "./components/pages/pageNotFound/pageNotFound.jsx";
import { Web3ModalProvider } from "./components/Wagmi/Web3ModalProvider.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "*", element: <PageNotFound /> },
    { path: "/", element: <Dashboard /> },
    { path: "/viewMintedNFT", element: <ViewInfo /> },
  ]);

  return (
    <>
      {/* Transaction Loader */}
      <div
        className="mainLoader loader loader-default "
        id="loaderVisibility"
        data-text="Loading...  Wait for Transaction to Complete!"></div>
      <div
        className="mainLoader loader loader-default "
        id="loaderVisibilityFetching"
        data-text="Loading...  Wait for Fetching Data!"></div>
      <Web3ModalProvider>
        <RouterProvider router={router} />
      </Web3ModalProvider>
    </>
  );
}

export default App;
