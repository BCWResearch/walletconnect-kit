import { AppKitNetwork } from "@reown/appkit/networks";
import { WalletMetadata } from "./walletMetaData";
import { SupportedChains } from "../constant/chain";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import * as wagmi from "wagmi";
export interface EvmProviderProps {
    chain: SupportedChains.EVM;
    projectId: string;
    enabledNetworks: [AppKitNetwork, ...AppKitNetwork[]];
    metadata?: WalletMetadata;
}
export interface EvmWalletContextType {
    useAppKit: typeof useAppKit;
    useAppKitAccount: typeof useAppKitAccount;
    wagmi: typeof wagmi;
}
