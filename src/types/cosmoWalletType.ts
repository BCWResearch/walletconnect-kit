import {
    useChain,
    useChains,
    useChainWallet,
    useIframe,
    useManager,
    useModalTheme,
    useNameService,
    useWallet,
    useWalletClient,
} from "@cosmos-kit/react";

export interface CosmoWalletContextType {
    useChain: typeof useChain;
    useChains: typeof useChains;
    useChainWallet: typeof useChainWallet;
    useIframe: typeof useIframe;
    useManager: typeof useManager;
    useWallet: typeof useWallet;
    useNameService: typeof useNameService;
    useModalTheme: typeof useModalTheme;
    useWalletClient: typeof useWalletClient;
}

export interface CosmosProviderProps {
    chainName: string[];
    walletName: "keplr-extension";
}
