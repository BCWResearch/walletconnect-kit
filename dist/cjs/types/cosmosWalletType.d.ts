import { Keplr } from "@keplr-wallet/provider-extension";
export * from "@keplr-wallet/types";
export interface CosmosProviderProps {
    chains: string | string[];
}
export interface CosmosWalletContextType {
    isConnected: boolean;
    address?: string;
    chainId?: string;
    keplr?: Keplr;
    signer: any;
    connect: (chainId: string) => Promise<void>;
    disconnect: () => void;
    switchChain: (chainId: string) => Promise<void>;
}
