import { LedgerId } from "@hashgraph/sdk";
import {
    DAppConnector,
    HederaSessionEvent,
    HederaJsonRpcMethod,
    HederaChainId,
    DAppSigner,
} from "@hashgraph/hedera-wallet-connect";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import TokenBalanceMap from "@hashgraph/sdk/lib/account/TokenBalanceMap";

const walletConnectProjectId = "377d75bb6f86a2ffd427d032ff6ea7d3";

interface HederaWalletContextType {
    dAppConnector: DAppConnector | null;
    isConnected: boolean;
    account: string | null;
    balance: string | null;
    tokens: TokenBalanceMap | null;
    signer: DAppSigner | null;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}

const HederaWalletContext = createContext<HederaWalletContextType>({
    dAppConnector: null,
    isConnected: false,
    account: null,
    balance: null,
    tokens: null,
    signer: null,
    connect: async () => {},
    disconnect: async () => {},
});

interface HederaProviderProps {
    children: ReactNode;
    metadata?: {
        name: string;
        description: string;
        url: string;
        icons: string[];
    };
    ledgerId?: LedgerId;
    projectId: string;
    allowedChains?: HederaChainId[];
}

export const HederaWalletProvider = ({
    children,
    projectId,
    metadata = {
        name: "Hedera Wallet Connect",
        description: "Hedera Wallet Connect",
        url: window.location.origin,
        icons: [window.location.origin + "/logo192.png"],
    },
    ledgerId = LedgerId.MAINNET,
    allowedChains = [HederaChainId.Mainnet, HederaChainId.Testnet],
}: HederaProviderProps) => {
    const [dAppConnector, setDAppConnector] = useState<DAppConnector | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [tokens, setTokens] = useState<TokenBalanceMap | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [signer, setSigner] = useState<DAppSigner | null>(null);

    // Init WalletConnect connector
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

    useEffect(() => {
        const setupSigner = async () => {
            if (!dAppConnector || dAppConnector.signers.length === 0) return;

            const userSigner = dAppConnector.signers[0];
            const accountId = userSigner.getAccountId().toString();
            const balance = await userSigner.getAccountBalance();
            const hbarAmount = balance.hbars.toString().split(" ")[0];
            const userTokens = balance.tokens;
            setSigner(userSigner);
            setAccount(accountId);
            setBalance(hbarAmount);
            setTokens(userTokens);
            setIsConnected(true);
        };

        setupSigner();
    }, [dAppConnector]);

    const connect = async () => {
        if (!dAppConnector) return;

        try {
            await dAppConnector.openModal();
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    };

    const disconnect = async () => {
        if (dAppConnector) {
            await dAppConnector.disconnectAll();
        }
        setDAppConnector(null);
        setAccount(null);
        setBalance(null);
        setTokens(null);
        setIsConnected(false);
    };

    return (
        <HederaWalletContext.Provider
            value={{
                dAppConnector,
                isConnected,
                account,
                balance,
                tokens,
                signer,
                connect,
                disconnect,
            }}
        >
            {children}
        </HederaWalletContext.Provider>
    );
};

export const useHederaWalletContext = () => useContext(HederaWalletContext);
