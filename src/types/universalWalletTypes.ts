import { SupportedChains } from "../constant/chain";
import { EvmProviderProps } from "./evmWalletTypes";
import { HederaProviderProps } from "./hederaWalletTypes";

export type ChainProviderConfig =
    | { chain: SupportedChains.HEDERA; props: HederaProviderProps }
    | { chain: SupportedChains.EVM; props: EvmProviderProps };

export interface UniversalWalletProviderProps {
    chains: ChainProviderConfig[];
    children: React.ReactNode;
}
