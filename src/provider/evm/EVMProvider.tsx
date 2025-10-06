import { AppKitNetwork } from "@reown/appkit/networks";
import {
    createAppKit,
    useAppKit,
    useAppKitAccount,
    useAppKitNetwork,
    useAppKitProvider,
    useAppKitBalance,
    useAppKitConnection,
    useAppKitConnections,
    useAppKitEvents,
    useAppKitNetworkCore,
    useAppKitState,
    useAppKitTheme,
    useDisconnect,
    useWalletInfo,
} from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { EvmProviderProps, EvmWalletContextType } from "../../types";
import { createContext, PropsWithChildren, useContext } from "react";
import * as wagmi from "wagmi";
import * as viem from "viem";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";

const queryClient = new QueryClient();

const EvmWalletContext = createContext<EvmWalletContextType | undefined>(undefined);

export const EvmWalletProvider = ({ children, options }: PropsWithChildren<EvmProviderProps>) => {
    const wagmiAdapter = new WagmiAdapter({
        networks: options.networks,
        projectId: options.projectId,
        ssr: false,
    });
    const solanaAdapter = new SolanaAdapter();

    createAppKit({
        adapters: [wagmiAdapter, solanaAdapter],
        ...options,
    });
    return (
        <EvmWalletContext.Provider
            value={{
                useAppKit,
                useAppKitAccount,
                useAppKitNetwork,
                useAppKitProvider,
                useAppKitBalance,
                useAppKitConnection,
                useAppKitConnections,
                useAppKitEvents,
                useAppKitNetworkCore,
                useAppKitState,
                useAppKitTheme,
                useDisconnect,
                useWalletInfo,
                wagmi,
                viem,
            }}
        >
            <WagmiProvider config={wagmiAdapter.wagmiConfig}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </WagmiProvider>
        </EvmWalletContext.Provider>
    );
};

export const useEvmWallet = (): EvmWalletContextType => {
    const context = useContext(EvmWalletContext);
    if (!context) {
        throw new Error("useEvmWallet must be used within an EvmWalletProvider");
    }
    return context;
};
