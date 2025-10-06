"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEvmWallet = exports.EvmWalletProvider = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@reown/appkit/react");
var appkit_adapter_wagmi_1 = require("@reown/appkit-adapter-wagmi");
var react_query_1 = require("@tanstack/react-query");
var wagmi_1 = require("wagmi");
var react_2 = require("react");
var wagmi = tslib_1.__importStar(require("wagmi"));
var viem = tslib_1.__importStar(require("viem"));
var appkit_adapter_solana_1 = require("@reown/appkit-adapter-solana");
var queryClient = new react_query_1.QueryClient();
var EvmWalletContext = (0, react_2.createContext)(undefined);
var EvmWalletProvider = function (_a) {
    var children = _a.children, options = _a.options;
    var wagmiAdapter = new appkit_adapter_wagmi_1.WagmiAdapter({
        networks: options.networks,
        projectId: options.projectId,
        ssr: false,
    });
    var solanaAdapter = new appkit_adapter_solana_1.SolanaAdapter();
    (0, react_1.createAppKit)(tslib_1.__assign({ adapters: [wagmiAdapter, solanaAdapter] }, options));
    return ((0, jsx_runtime_1.jsx)(EvmWalletContext.Provider, { value: {
            useAppKit: react_1.useAppKit,
            useAppKitAccount: react_1.useAppKitAccount,
            useAppKitNetwork: react_1.useAppKitNetwork,
            useAppKitProvider: react_1.useAppKitProvider,
            useAppKitBalance: react_1.useAppKitBalance,
            useAppKitConnection: react_1.useAppKitConnection,
            useAppKitConnections: react_1.useAppKitConnections,
            useAppKitEvents: react_1.useAppKitEvents,
            useAppKitNetworkCore: react_1.useAppKitNetworkCore,
            useAppKitState: react_1.useAppKitState,
            useAppKitTheme: react_1.useAppKitTheme,
            useDisconnect: react_1.useDisconnect,
            useWalletInfo: react_1.useWalletInfo,
            wagmi: wagmi,
            viem: viem,
        }, children: (0, jsx_runtime_1.jsx)(wagmi_1.WagmiProvider, { config: wagmiAdapter.wagmiConfig, children: (0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient, children: children }) }) }));
};
exports.EvmWalletProvider = EvmWalletProvider;
var useEvmWallet = function () {
    var context = (0, react_2.useContext)(EvmWalletContext);
    if (!context) {
        throw new Error("useEvmWallet must be used within an EvmWalletProvider");
    }
    return context;
};
exports.useEvmWallet = useEvmWallet;
//# sourceMappingURL=EVMProvider.js.map