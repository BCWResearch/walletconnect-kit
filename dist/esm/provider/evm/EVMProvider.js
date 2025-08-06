import { jsx as _jsx } from "react/jsx-runtime";
import { createAppKit, useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { createContext, useContext } from "react";
import * as wagmi from "wagmi";
var queryClient = new QueryClient();
var EvmWalletContext = createContext(undefined);
export var EvmWalletProvider = function (_a) {
    var children = _a.children, projectId = _a.projectId, enabledNetworks = _a.enabledNetworks, _b = _a.metadata, metadata = _b === void 0 ? {
        name: "Evm Wallet Connector",
        description: "AppKit Example",
        url: "https://reown.com/appkit",
        icons: ["https://assets.reown.com/reown-profile-pic.png"],
    } : _b;
    var networks = enabledNetworks;
    var wagmiAdapter = new WagmiAdapter({
        networks: networks,
        projectId: projectId,
        ssr: false,
    });
    createAppKit({
        adapters: [wagmiAdapter],
        networks: networks,
        projectId: projectId,
        metadata: metadata,
    });
    return (_jsx(EvmWalletContext.Provider, { value: { useAppKit: useAppKit, useAppKitAccount: useAppKitAccount, wagmi: wagmi }, children: _jsx(WagmiProvider, { config: wagmiAdapter.wagmiConfig, children: _jsx(QueryClientProvider, { client: queryClient, children: children }) }) }));
};
export var useEvmWallet = function () {
    var context = useContext(EvmWalletContext);
    if (!context) {
        throw new Error("useEvmWallet must be used within an EvmWalletProvider");
    }
    return context;
};
//# sourceMappingURL=EVMProvider.js.map