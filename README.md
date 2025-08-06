# WalletConnect Kit

**BCWResearch/walletconnect-kit** is a modular, universal wallet connection toolkit for React applications.  
It supports **EVM-compatible chains** (via [Wagmi](https://wagmi.sh/react/getting-started) + [Reown AppKit](https://docs.reown.com/appkit/react/core/installation)) and **Hedera** (via [Hedera SDK](https://github.com/hashgraph/hedera-sdk-js) + [Wallet-connect](https://github.com/hashgraph/hedera-wallet-connect?tab=readme-ov-file#using-this-library-and-underlying-walletconnect-libraries-directly) + [Mirror Node API](https://docs.hedera.com/hedera/sdks-and-apis/rest-api)).

You can wrap your app in one or more wallet providers, allowing for **multi-chain** or **single-chain** wallet connectivity.

---

## ✨ Features

- **EVM support**: Connect, disconnect, get account, network, balance being exposed from wagmi, 
- **Hedera support**: Connect, disconnect, account, balance, token data
- **Universal provider**: Compose providers for one or multiple chains
- **Custom hooks** for accessing wallet data (useHederaWallet & useEvmWallet)


---

## 📦 Installation

```bash
# Install from your repo
npm install github:BCWResearch/walletconnect-kit

# Or with yarn
yarn add github:BCWResearch/walletconnect-kit
```


# How to Use

The main provider is know as **UniversalWalletProvider(UWP)** where you can use either a single or multi wallet connection. 

## Setup 

### **walletConnectProjectId(AKA projectID )** here is needed it comes from walletconnect id which is obtained from reown project as well (this is rather confusing so will find the steps to locate once i FIND it myself :) TODO )

### Multi wallet connection
```javascript
import { LedgerId, mainnet, SupportedChains,  UniversalWalletProvider, } from 'walletconnect-kit'
    <UniversalWalletProvider
        chains={[
            {
                chain: SupportedChains.HEDERA,
                props: {
                    chain: SupportedChains.HEDERA,
                    projectId: walletConnectProjectId,
                    ledgerId: LedgerId.MAINNET, // or mainnet
                    metadata: {
                        name: "My Hedera Wallet",
                        description: "Wallet for Hedera chain",
                        url: "https://example.com",
                        icons: ["https://example.com/icon.png"],
                    },
                },
            },
            {
                chain: SupportedChains.EVM,
                props: {
                    chain: SupportedChains.EVM,
                    projectId: walletConnectProjectId,
                    enabledNetworks: [mainnet],
                    metadata: {
                        name: "My EVM Wallet",
                        description: "Wallet for EVM chains",
                        url: "https://example.com",
                        icons: ["https://example.com/icon.png"],
                    },
                },
            },
        ]}
    >
        <App /> {/* Now the whole app will have access to the context of wallet connection*/}
    </UniversalWalletProvider>;
```

### Single wallet connection
```javascript
import  { SupportedChains, UniversalWalletProvider } from 'genric-wallet-connect'
//ADD the other shit
    <UniversalWalletProvider
        chains={[
            {
                chain: SupportedChains.EVM,
                props: {
                    chain: SupportedChains.EVM,
                    projectId: walletConnectProjectId,
                    enabledNetworks: [mainnet],
                    metadata: {
                        name: "My EVM Wallet",
                        description: "Wallet for EVM chains",
                        url: "https://example.com",
                        icons: ["https://example.com/icon.png"],
                    },
                },
            },
        ]}
    >
        <App /> {/* Now the whole app will have access to the context of wallet connection*/}
    </UniversalWalletProvider>;
```


### Access wallet info 

### EVM

```javascript
export interface EvmWalletContextType {
    useAppKit: typeof useAppKit;
    useAppKitAccount: typeof useAppKitAccount;
    wagmi: typeof wagmi;
}


const { useAppKit, useAppKitAccount, wagmi } = useEvmWallet();


```
- exposed useAppKit and useAppKitAccount so full access of that from reown 
- useAppkit has the open and close functionality reference https://docs.reown.com/appkit/react/core/hooks#useappkit
 - useAppKitAccount has some key variables like isConnected, allAccounts, address reference https://docs.reown.com/appkit/react/core/hooks#useappkitaccount
 - exposed wagmi on purpose so we can fully utilize teh library as needed like this hooks https://wagmi.sh/react/api/hooks


### Hedera 
```javascript
    export interface HederaWalletContextType {
        dAppConnector?: DAppConnector;
        isConnected: boolean;
        account?: string;
        balance?: number;
        tokens?: TokenMap;
        transactionHistory?: HederaTransaction[];
        signer?: DAppSigner;
        connect: () => Promise<void>;
        disconnect: () => Promise<void>;
    }

  const {
        connect,
        disconnect,
        isConnected,
        account,
        balance,
        dAppConnector,
        signer,
        tokens,
        transactionHistory,
    } = useHederaWallet();
```
- we are using the new wallet connect setup that hedera is pushing out, seems really a rough version this will change as that gets stable, for for further info reference here https://github.com/hashgraph/hedera-wallet-connect?tab=readme-ov-file#using-this-library-and-underlying-walletconnect-libraries-directly do recommend to look and get a basic understanding if the set up seems confusing.


### Key Interfaces&Constant to know 

### Interfaces
#### UWP Interface
```javascript

export interface UniversalWalletProviderProps {
    chains: ChainProviderConfig[];
    children: React.ReactNode;
}

// Where the ChainProviderConfig are the wallet connection that is supported
export type ChainProviderConfig =
    | { chain: SupportedChains.HEDERA; props: HederaProviderProps }
    | { chain: SupportedChains.EVM; props: EvmProviderProps };

```

#### to use **Hedera** you need the following:
```javascript
export interface HederaProviderProps {
    chain: SupportedChains.HEDERA;
    metadata?: WalletMetadata;
    ledgerId?: LedgerId;
    projectId: string;
    allowedChains?: HederaChainId[];
}
```

#### to use **EVM** you need the following:
```javascript
export interface EvmProviderProps {
    chain: SupportedChains.EVM;
    projectId: string;
    enabledNetworks: [AppKitNetwork, ...AppKitNetwork[]];
    metadata?: WalletMetadata;
}
```

#### WalletMetadata
```javascript
export interface WalletMetadata {
    name: string;
    description: string;
    url: string;
    icons: string[];
}

//e.g
   metadata: {
        name: "My Hedera Wallet",
        description: "Wallet for Hedera chain",
        url: "https://example.com",
        icons: ["https://example.com/icon.png"]
    }
```
### Constant 

#### Supported Chain 
```javascript
export enum SupportedChains {
    HEDERA = "HEDERA",
    EVM = "EVM",
}
```


#### enabledNetworks (Needed for EVM refer to EvmProviderProps) 
```javascript
export * from "@reown/appkit/networks";

// you can export any networks that is reown capable if not custom networks refer to this doc https://docs.reown.com/appkit/react/core/custom-networks
```


#### HederaChainId && LedgerId (Needed for Hedera refer to HederaProviderProps) 
```javascript
export { HederaChainId } from "@hashgraph/hedera-wallet-connect";
export { LedgerId } from "@hashgraph/sdk";

// These are needed for HederaProviderProps, this is to pick between mainnet and testnet 
```

for enabledNetworks, HederaChainId & LedgerId its exposed in the provider so it can be imported from there if not you can respective library
