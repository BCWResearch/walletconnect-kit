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
var queryClient = new react_query_1.QueryClient();
var EvmWalletContext = (0, react_2.createContext)(undefined);
var EvmWalletProvider = function (_a) {
    var children = _a.children, projectId = _a.projectId, enabledNetworks = _a.enabledNetworks, _b = _a.metadata, metadata = _b === void 0 ? {
        name: "Evm Wallet Connector",
        description: "AppKit Example",
        url: "https://reown.com/appkit",
        icons: ["https://assets.reown.com/reown-profile-pic.png"],
    } : _b;
    var networks = enabledNetworks;
    var wagmiAdapter = new appkit_adapter_wagmi_1.WagmiAdapter({
        networks: networks,
        projectId: projectId,
        ssr: false,
    });
    (0, react_1.createAppKit)({
        adapters: [wagmiAdapter],
        networks: networks,
        projectId: projectId,
        metadata: metadata,
    });
    return ((0, jsx_runtime_1.jsx)(EvmWalletContext.Provider, { value: { useAppKit: react_1.useAppKit, useAppKitAccount: react_1.useAppKitAccount, wagmi: wagmi }, children: (0, jsx_runtime_1.jsx)(wagmi_1.WagmiProvider, { config: wagmiAdapter.wagmiConfig, children: (0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient, children: children }) }) }));
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