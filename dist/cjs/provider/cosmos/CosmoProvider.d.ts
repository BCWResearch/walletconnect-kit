import { PropsWithChildren } from "react";
import { CosmoWalletContextType } from "../../types/cosmoWalletType";
export declare const CosmosWalletProvider: ({ children, chainName }: PropsWithChildren<any>) => import("react/jsx-runtime").JSX.Element;
export declare const useCosmoWallet: () => CosmoWalletContextType;
