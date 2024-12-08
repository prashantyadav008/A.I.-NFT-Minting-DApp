/** @format */

import { createConfig, http, injected } from "@wagmi/core";
import { mainnet, sepolia, polygon } from "@wagmi/core/chains";
import { walletConnect } from "@wagmi/connectors";

const config = createConfig({
  chains: [mainnet, sepolia, polygon],
  connectors: [
    walletConnect({
      projectId: process.env.REACT_APP_WALLETCONECT_PROJECTID,
      showQrModal: false,
    }),
    injected(),
  ],
  transports: {
    [sepolia.id]: http(process.env.REACT_APP_SEPOLIA_API_KEY),
    [polygon.id]: http(process.env.REACT_APP_POLYGON_MAINNET_API_KEY),
    [mainnet.id]: http(process.env.REACT_APP_MAINNET_API_KEY),
  },
});

export { config };
