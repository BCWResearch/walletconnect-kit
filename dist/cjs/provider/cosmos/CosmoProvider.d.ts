import { Keplr } from "@keplr-wallet/provider-extension";
import { PropsWithChildren } from "react";
import { CosmosProviderProps, CosmosWalletContextType } from "../../types/cosmosWalletType";
export declare const getKeplr: () => Promise<Keplr | undefined>;
export declare const CosmoWalletProvider: ({ chains, children, }: PropsWithChildren<CosmosProviderProps>) => import("react/jsx-runtime").JSX.Element;
export declare const useCosmoWallet: () => CosmosWalletContextType;
