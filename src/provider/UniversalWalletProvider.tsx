import { SupportedChains } from "../constant";
import { UniversalWalletProviderProps } from "../types";
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
    });

    return <>{wrapped}</>;
};
