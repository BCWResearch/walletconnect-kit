import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { ChainProvider, useChain, useChains } from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";
import { chains, assetLists } from "chain-registry";
var CosmoWalletContext = createContext(undefined);
export var CosmosWalletProvider = function (_a) {
    var children = _a.children, chainName = _a.chainName;
    var chainHook = useChain(chainName);
    var chainHooks = useChains(chainName);
    var contextValue = { chainHook: chainHook, chainHooks: chainHooks };
    return (_jsx(CosmoWalletContext.Provider, { value: contextValue, children: _jsx(ChainProvider // @ts-ignore
        , { chains: chains, 
            // @ts-ignore
            assetLists: assetLists, wallets: wallets, children: children }) }));
};
// Hook to access the context
export var useCosmoWallet = function () {
    var context = useContext(CosmoWalletContext);
    if (!context) {
        throw new Error("useCosmoWallet must be used within a CosmosWalletProvider");
    }
    return context;
};
//# sourceMappingURL=CosmoProvider.js.map