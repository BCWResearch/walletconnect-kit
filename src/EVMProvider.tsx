import { AppKitNetwork } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface EvmProviderProps {
    children: ReactNode;
    projectId: string;
    enabledNetworks: [AppKitNetwork, ...AppKitNetwork[]];
    metadata?: {
        name: string;
        description: string;
        url: string;
        icons: string[];
    };
}

export const WalletProvider = ({
    children,
    projectId,
    enabledNetworks,
    metadata = {
        name: `Evm Wallet Connector`,
        description: `AppKit Example`,
        url: `https://reown.com/appkit`,
        icons: [`https://assets.reown.com/reown-profile-pic.png`],
    },
}: EvmProviderProps) => {
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
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
};
