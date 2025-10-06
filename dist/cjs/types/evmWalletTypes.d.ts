import { useAppKit, useAppKitAccount, useAppKitBalance, useAppKitConnection, useAppKitConnections, useAppKitEvents, useAppKitNetwork, useAppKitNetworkCore, useAppKitProvider, useAppKitState, useAppKitTheme, useWalletInfo, useDisconnect } from "@reown/appkit/react";
import * as wagmi from "wagmi";
import * as viem from "viem";
import { CreateAppKit } from "@reown/appkit";
export interface EvmProviderProps {
    options: Omit<CreateAppKit, "adapters">;
}
export interface EvmWalletContextType {
    useAppKit: typeof useAppKit;
    useAppKitAccount: typeof useAppKitAccount;
    useAppKitNetwork: typeof useAppKitNetwork;
    useAppKitBalance: typeof useAppKitBalance;
    useAppKitProvider: typeof useAppKitProvider;
    useAppKitConnection: typeof useAppKitConnection;
    useAppKitConnections: typeof useAppKitConnections;
    useAppKitEvents: typeof useAppKitEvents;
    useAppKitNetworkCore: typeof useAppKitNetworkCore;
    useAppKitState: typeof useAppKitState;
    useAppKitTheme: typeof useAppKitTheme;
    useDisconnect: typeof useDisconnect;
    useWalletInfo: typeof useWalletInfo;
    wagmi: typeof wagmi;
    viem: typeof viem;
}
