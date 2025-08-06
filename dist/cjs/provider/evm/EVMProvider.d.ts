import { EvmProviderProps, EvmWalletContextType } from "../../types";
import { PropsWithChildren } from "react";
export declare const EvmWalletProvider: ({ children, projectId, enabledNetworks, metadata, }: PropsWithChildren<EvmProviderProps>) => import("react/jsx-runtime").JSX.Element;
export declare const useEvmWallet: () => EvmWalletContextType;
