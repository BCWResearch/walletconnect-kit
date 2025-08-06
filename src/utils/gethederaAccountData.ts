import axios from "axios";
import { HederaTransaction, TokenMap } from "../types";

const BASE_URL = "https://mainnet-public.mirrornode.hedera.com/api/v1";

export const getHederaAccountData = async (
    accountId: string,
): Promise<{
    hbarBalance: number;
    tokens: TokenMap;
    transactions: HederaTransaction[];
}> => {
    const accountUrl = `${BASE_URL}/accounts/${accountId}`;
    const txUrl = `${BASE_URL}/transactions?account.id=${accountId}`;

    const [accountRes, txRes] = await Promise.all([axios.get(accountUrl), axios.get(txUrl)]);

    const { balance } = accountRes.data;
    const transactions = txRes.data.transactions;

    return { hbarBalance: balance.balance, tokens: balance.tokens, transactions };
};
