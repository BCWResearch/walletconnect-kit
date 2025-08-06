import { AppKitNetwork } from "@reown/appkit/networks";
import { createAppKit, useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAccount, WagmiProvider } from "wagmi";
import { EvmProviderProps, EvmWalletContextType } from "../../types";
import { createContext, PropsWithChildren, useContext } from "react";
import * as wagmi from "wagmi";

const queryClient = new QueryClient();

const EvmWalletContext = createContext<EvmWalletContextType | undefined>(undefined);

export const EvmWalletProvider = ({
    children,
    projectId,
    enabledNetworks,
    metadata = {
        name: `Evm Wallet Connector`,
        description: `AppKit Example`,
        url: `https://reown.com/appkit`,
        icons: [`https://assets.reown.com/reown-profile-pic.png`],
    },
}: PropsWithChildren<EvmProviderProps>) => {
    const networks: [AppKitNetwork, ...AppKitNetwork[]] = enabledNetworks;
    const wagmiAdapter = new WagmiAdapter({
        networks,
        projectId,
        ssr: false,
    });

    createAppKit({
        adapters: [wagmiAdapter],
        networks,
        projectId,
        metadata,
    });
    return (
        <EvmWalletContext.Provider value={{ useAppKit, useAppKitAccount, wagmi }}>
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
