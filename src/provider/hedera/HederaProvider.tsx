import { LedgerId } from "@hashgraph/sdk";
import {
    DAppConnector,
    HederaSessionEvent,
    HederaJsonRpcMethod,
    HederaChainId,
    DAppSigner,
} from "@hashgraph/hedera-wallet-connect";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import TokenBalanceMap from "@hashgraph/sdk/lib/account/TokenBalanceMap";
import {
    HederaWalletContextType,
    HederaProviderProps,
    TokenMap,
    HederaTransaction,
} from "../../types";
import { getHederaAccountData } from "../../utils/gethederaAccountData";

const HederaWalletContext = createContext<HederaWalletContextType>({
    dAppConnector: undefined,
    isConnected: false,
    account: undefined,
    balance: undefined,
    tokens: undefined,
    signer: undefined,
    transactionHistory: undefined,
    connect: async () => {},
    disconnect: async () => {},
});

export const HederaWalletProvider = ({
    children,
    projectId,
    metadata = {
        name: "Hedera Wallet Connect",
        description: "Hedera Wallet Connect",
        url: window.location.origin,
        icons: [window.location.origin],
    },
    ledgerId = LedgerId.MAINNET,
    allowedChains = [HederaChainId.Mainnet, HederaChainId.Testnet],
}: PropsWithChildren<HederaProviderProps>) => {
    const [dAppConnector, setDAppConnector] = useState<DAppConnector | undefined>(undefined);
    const [account, setAccount] = useState<string | undefined>(undefined);
    const [balance, setBalance] = useState<number | undefined>(undefined);
    const [tokens, setTokens] = useState<TokenMap | undefined>(undefined);
    const [transactionHistory, setTransactionsHistory] = useState<HederaTransaction[] | undefined>(
        undefined,
    );
    const [isConnected, setIsConnected] = useState(false);
    const [signer, setSigner] = useState<DAppSigner | undefined>(undefined);

    useEffect(() => {
        const initConnector = async () => {
            const instance = new DAppConnector(
                metadata,
                ledgerId,
                projectId,
                Object.values(HederaJsonRpcMethod),
                [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
                allowedChains,
            );

            await instance.init({ logger: "error" });
            setDAppConnector(instance);
        };

        initConnector();
    }, []);

    const connect = async () => {
        if (!dAppConnector) return;

        try {
            await dAppConnector.openModal();

            const setupSigner = async () => {
                if (!dAppConnector || dAppConnector.signers.length === 0) return;

                const userSigner = dAppConnector.signers[0];
                const accountId = userSigner.getAccountId().toString();
                getHederaAccountData(accountId)
                    .then((res) => {
                        const { tokens, hbarBalance, transactions } = res;

                        setTokens(tokens);
                        setBalance(hbarBalance);
                        setTransactionsHistory(transactions);
                    })
                    .catch((e) => console.log(e));
                console.log("this is a test", userSigner, accountId, balance);
                setSigner(userSigner);
                setAccount(accountId);
                setIsConnected(true);
            };

            setupSigner();
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    };

    const disconnect = async () => {
        if (dAppConnector) {
            await dAppConnector.disconnectAll();
            setAccount(undefined);
            setBalance(undefined);
            setTokens(undefined);
            setIsConnected(false);
        }
    };

    useEffect(() => {}, [dAppConnector]);

    return (
        <HederaWalletContext.Provider
            value={{
                dAppConnector,
                isConnected,
                account,
                balance,
                tokens,
                signer,
                transactionHistory,
                connect,
                disconnect,
            }}
        >
            {children}
        </HederaWalletContext.Provider>
    );
};

export const useHederaWallet = (): HederaWalletContextType => {
    return useContext(HederaWalletContext);
};
