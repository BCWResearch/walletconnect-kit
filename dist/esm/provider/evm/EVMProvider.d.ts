import { EvmProviderProps, EvmWalletContextType } from "../../types";
import { PropsWithChildren } from "react";
export declare const EvmWalletProvider: ({ children, options }: PropsWithChildren<EvmProviderProps>) => import("react/jsx-runtime").JSX.Element;
export declare const useEvmWallet: () => EvmWalletContextType;
