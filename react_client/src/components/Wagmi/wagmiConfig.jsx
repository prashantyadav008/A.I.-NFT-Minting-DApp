/** @format */

import { createConfig, http, injected } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";
import { walletConnect } from "@wagmi/connectors";

import { createWalletClient, custom } from "viem";

const config = createConfig({
  chains: [sepolia],
  connectors: [
    walletConnect({
      // eslint-disable-next-line no-undef
      projectId: process.env.REACT_APP_WALLETCONECT_PROJECTID,
      showQrModal: false,
    }),
    injected(),
  ],
  transports: {
    // eslint-disable-next-line no-undef
    [sepolia.id]: http(process.env.REACT_APP_SEPOLIA_API_KEY),
  },
});

const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom({
    request: async ({ method, params }) => {
      // eslint-disable-next-line no-undef
      const response = await fetch(process.env.REACT_APP_SEPOLIA_API_KEY, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      return response.json();
    },
  }),
});

export { config, walletClient };
