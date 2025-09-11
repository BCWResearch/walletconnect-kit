import { createContext, PropsWithChildren, useContext } from "react";
import { CosmosProviderProps, CosmoWalletContextType } from "../../types/cosmoWalletType";
import {
    ChainProvider,
    useChain as _useChain,
    useChains as _useChains,
    useChainWallet as _useChainWallet,
    useIframe,
    useManager,
    useWallet,
    useNameService,
    useModalTheme,
    useWalletClient,
} from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";
import { chains, assetLists } from "chain-registry";

const CosmoWalletContext = createContext<CosmoWalletContextType | undefined>(undefined);

export const CosmosWalletProvider = ({
    children,
    chainName,
    walletName,
}: PropsWithChildren<CosmosProviderProps>) => {
    const useChain = () => _useChain(chainName[0]);
    const useChains = () => _useChains(chainName);
    const useChainWallet = () => _useChainWallet(chainName[0], walletName);
    return (
        <CosmoWalletContext.Provider
            value={{
                useChain,
                useChains,
                useChainWallet,
                useIframe,
                useManager,
                useWallet,
                useNameService,
                useModalTheme,
                useWalletClient,
            }}
        >
            <ChainProvider // @ts-ignore
                chains={chains}
                // @ts-ignore
                assetLists={assetLists}
                wallets={wallets}
            >
                {children}
            </ChainProvider>
        </CosmoWalletContext.Provider>
    );
};

// Hook to access the context
export const useCosmoWallet = (): CosmoWalletContextType => {
    const context = useContext(CosmoWalletContext);
    if (!context) {
        throw new Error("useCosmoWallet must be used within a CosmosWalletProvider");
    }
    return context;
};
