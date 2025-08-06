import { HederaTransaction, TokenMap } from "../types";
export declare const getHederaAccountData: (accountId: string) => Promise<{
    hbarBalance: number;
    tokens: TokenMap;
    transactions: HederaTransaction[];
}>;
