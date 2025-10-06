import { SupportedChains } from "../constant/chain";
import { CosmosProviderProps } from "./cosmosWalletType";
import { EvmProviderProps } from "./evmWalletTypes";
import { HederaProviderProps } from "./hederaWalletTypes";

export type ChainProviderConfig =
    | { chain: SupportedChains.HEDERA; props: HederaProviderProps }
    | { chain: SupportedChains.EVM; props: EvmProviderProps }
    | { chain: SupportedChains.COSMOS; props: CosmosProviderProps };

export interface UniversalWalletProviderProps {
    chains: ChainProviderConfig[];
    children: React.ReactNode;
}
