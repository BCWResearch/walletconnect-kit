import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { createAppKit, useAppKit, useAppKitAccount, useAppKitNetwork, useAppKitProvider, useAppKitBalance, useAppKitConnection, useAppKitConnections, useAppKitEvents, useAppKitNetworkCore, useAppKitState, useAppKitTheme, useDisconnect, useWalletInfo, } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { createContext, useContext } from "react";
import * as wagmi from "wagmi";
import * as viem from "viem";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
var queryClient = new QueryClient();
var EvmWalletContext = createContext(undefined);
export var EvmWalletProvider = function (_a) {
    var children = _a.children, options = _a.options;
    var wagmiAdapter = new WagmiAdapter({
        networks: options.networks,
        projectId: options.projectId,
        ssr: false,
    });
    var solanaAdapter = new SolanaAdapter();
    createAppKit(__assign({ adapters: [wagmiAdapter, solanaAdapter] }, options));
    return (_jsx(EvmWalletContext.Provider, { value: {
            useAppKit: useAppKit,
            useAppKitAccount: useAppKitAccount,
            useAppKitNetwork: useAppKitNetwork,
            useAppKitProvider: useAppKitProvider,
            useAppKitBalance: useAppKitBalance,
            useAppKitConnection: useAppKitConnection,
            useAppKitConnections: useAppKitConnections,
            useAppKitEvents: useAppKitEvents,
            useAppKitNetworkCore: useAppKitNetworkCore,
            useAppKitState: useAppKitState,
            useAppKitTheme: useAppKitTheme,
            useDisconnect: useDisconnect,
            useWalletInfo: useWalletInfo,
            wagmi: wagmi,
            viem: viem,
        }, children: _jsx(WagmiProvider, { config: wagmiAdapter.wagmiConfig, children: _jsx(QueryClientProvider, { client: queryClient, children: children }) }) }));
};
export var useEvmWallet = function () {
    var context = useContext(EvmWalletContext);
    if (!context) {
        throw new Error("useEvmWallet must be used within an EvmWalletProvider");
    }
    return context;
};
//# sourceMappingURL=EVMProvider.js.map