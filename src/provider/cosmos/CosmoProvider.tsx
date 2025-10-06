import { Keplr } from "@keplr-wallet/provider-extension";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CosmosProviderProps, CosmosWalletContextType } from "../../types/cosmosWalletType";

const CosmosWalletContext = createContext<CosmosWalletContextType | undefined>(undefined);

export const getKeplr = async (): Promise<Keplr | undefined> => {
    try {
        const keplr = await Keplr.getKeplr();
        if (!keplr) throw new Error("Keplr not found");
        return keplr;
    } catch (err) {
        console.error("Failed to get Keplr:", err);
        return undefined;
    }
};

export const CosmoWalletProvider = ({
    chains,
    children,
}: PropsWithChildren<CosmosProviderProps>) => {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState<string>("");
    const [keplr, setKeplr] = useState<Keplr | undefined>(undefined);
    const [signer, setSigner] = useState<any>(undefined);

    const connect = async () => {
        try {
            const keplr = await getKeplr();
            if (keplr) {
                await keplr.enable(chains);
                const signer = keplr.getOfflineSigner(Array.isArray(chains) ? chains[0] : chains);
                const accounts = await signer.getAccounts();
                setKeplr(keplr);
                setAddress(accounts[0].address);
                setSigner(signer);
                setIsConnected(true);
            }
        } catch (err) {
            console.error("Error connecting Keplr:", err);
        }
    };

    const disconnect = async () => {
        await keplr?.disable();

        setAddress("");
        setSigner(undefined);
        setIsConnected(false);
        setKeplr(undefined);
    };

    const switchChain = async (chainId: string) => {
        if (keplr) {
            await keplr.enable(chainId);
            const signer = keplr.getOfflineSigner(chainId);
            const accounts = await signer.getAccounts();
            setKeplr(keplr);
            setAddress(accounts[0].address);
            setSigner(signer);
        }
    };

    return (
        <CosmosWalletContext.Provider
            value={{ isConnected, address, signer, keplr, connect, disconnect, switchChain }}
        >
            {children}
        </CosmosWalletContext.Provider>
    );
};

export const useCosmoWallet = () => {
    const context = useContext(CosmosWalletContext);
    if (!context) {
        throw new Error("useCosmoWallet must be used within an CosmoWalletProvider");
    }
    return context;
};
