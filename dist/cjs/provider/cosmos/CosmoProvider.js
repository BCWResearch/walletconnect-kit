"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCosmoWallet = exports.CosmosWalletProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("@cosmos-kit/react");
var keplr_1 = require("@cosmos-kit/keplr");
var chain_registry_1 = require("chain-registry");
var CosmoWalletContext = (0, react_1.createContext)(undefined);
var CosmosWalletProvider = function (_a) {
    var children = _a.children, chainName = _a.chainName;
    var chainHook = (0, react_2.useChain)(chainName);
    var chainHooks = (0, react_2.useChains)(chainName);
    var contextValue = { chainHook: chainHook, chainHooks: chainHooks };
    return ((0, jsx_runtime_1.jsx)(CosmoWalletContext.Provider, { value: contextValue, children: (0, jsx_runtime_1.jsx)(react_2.ChainProvider // @ts-ignore
        , { chains: chain_registry_1.chains, 
            // @ts-ignore
            assetLists: chain_registry_1.assetLists, wallets: keplr_1.wallets, children: children }) }));
};
exports.CosmosWalletProvider = CosmosWalletProvider;
// Hook to access the context
var useCosmoWallet = function () {
    var context = (0, react_1.useContext)(CosmoWalletContext);
    if (!context) {
        throw new Error("useCosmoWallet must be used within a CosmosWalletProvider");
    }
    return context;
};
exports.useCosmoWallet = useCosmoWallet;
//# sourceMappingURL=CosmoProvider.js.map