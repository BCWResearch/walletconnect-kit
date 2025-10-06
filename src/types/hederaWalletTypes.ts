import { LedgerId } from "@hashgraph/sdk";
import { DAppConnector, DAppSigner, HederaChainId } from "@hashgraph/hedera-wallet-connect";
import { WalletMetadata } from "./walletMetaData";
import TokenBalanceMap from "@hashgraph/sdk/lib/account/TokenBalanceMap";
import { SupportedChains } from "../constant/chain";

export type TokenMap = { balance: number; token_id: string }[];

export interface HederaTransaction {
    batch_key: string | null;
    bytes: string | null;
    charged_tx_fee: number;
    consensus_timestamp: string;
    entity_id: string | null;
    max_custom_fees: unknown[];
    max_fee: string;
    memo_base64: string;
    name: string;
    nft_transfers: unknown[];
    node: string;
    nonce: number;
    parent_consensus_timestamp: string | null;
    result: string;
    scheduled: boolean;
    staking_reward_transfers: unknown[];
    token_transfers: unknown[];
    transaction_hash: string;
    transaction_id: string;
    transfers: {
        account: string;
        amount: number;
        is_approval?: boolean;
    }[];
    valid_duration_seconds: string;
    valid_start_timestamp: string;
}

export interface HederaWalletContextType {
    dAppConnector?: DAppConnector;
    isConnected: boolean;
    account?: string;
    balance?: number;
    tokens?: TokenMap;
    transactionHistory?: HederaTransaction[];
    signer?: DAppSigner;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}

export interface HederaProviderProps {
    metadata?: WalletMetadata;
    ledgerId?: LedgerId;
    projectId: string;
    allowedChains?: HederaChainId[];
}
