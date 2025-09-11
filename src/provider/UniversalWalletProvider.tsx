import { SupportedChains } from "../constant";
import { UniversalWalletProviderProps } from "../types";
import { CosmosWalletProvider } from "./cosmos/CosmoProvider";
import { EvmWalletProvider } from "./evm/EVMProvider";
import { HederaWalletProvider } from "./hedera/HederaProvider";

export const UniversalWalletProvider = ({ chains, children }: UniversalWalletProviderProps) => {
    let wrapped = children;

    chains.forEach(({ chain, props }) => {
        if (chain === SupportedChains.HEDERA) {
            wrapped = <HederaWalletProvider {...props}>{wrapped}</HederaWalletProvider>;
        }

        if (chain === SupportedChains.EVM) {
            wrapped = <EvmWalletProvider {...props}>{wrapped}</EvmWalletProvider>;
        }

        if (chain === SupportedChains.COSMOS) {
            wrapped = <CosmosWalletProvider {...props}>{wrapped}</CosmosWalletProvider>;
        }
    });

    return <>{wrapped}</>;
};
