import { PropsWithChildren } from "react";
import { HederaWalletContextType, HederaProviderProps } from "../../types";
export declare const HederaWalletProvider: ({ children, projectId, metadata, ledgerId, allowedChains, }: PropsWithChildren<HederaProviderProps>) => import("react/jsx-runtime").JSX.Element;
export declare const useHederaWallet: () => HederaWalletContextType;
