import { __awaiter, __generator } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { LedgerId } from "@hashgraph/sdk";
import { DAppConnector, HederaSessionEvent, HederaJsonRpcMethod, HederaChainId, } from "@hashgraph/hedera-wallet-connect";
import { createContext, useContext, useEffect, useState } from "react";
import { getHederaAccountData } from "../../utils/gethederaAccountData";
var HederaWalletContext = createContext({
    dAppConnector: undefined,
    isConnected: false,
    account: undefined,
    balance: undefined,
    tokens: undefined,
    signer: undefined,
    transactionHistory: undefined,
    connect: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); },
    disconnect: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); },
});
export var HederaWalletProvider = function (_a) {
    var children = _a.children, projectId = _a.projectId, _b = _a.metadata, metadata = _b === void 0 ? {
        name: "Hedera Wallet Connect",
        description: "Hedera Wallet Connect",
        url: window.location.origin,
        icons: [window.location.origin],
    } : _b, _c = _a.ledgerId, ledgerId = _c === void 0 ? LedgerId.MAINNET : _c, _d = _a.allowedChains, allowedChains = _d === void 0 ? [HederaChainId.Mainnet, HederaChainId.Testnet] : _d;
    var _e = useState(undefined), dAppConnector = _e[0], setDAppConnector = _e[1];
    var _f = useState(undefined), account = _f[0], setAccount = _f[1];
    var _g = useState(undefined), balance = _g[0], setBalance = _g[1];
    var _h = useState(undefined), tokens = _h[0], setTokens = _h[1];
    var _j = useState(undefined), transactionHistory = _j[0], setTransactionsHistory = _j[1];
    var _k = useState(false), isConnected = _k[0], setIsConnected = _k[1];
    var _l = useState(undefined), signer = _l[0], setSigner = _l[1];
    useEffect(function () {
        var initConnector = function () { return __awaiter(void 0, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = new DAppConnector(metadata, ledgerId, projectId, Object.values(HederaJsonRpcMethod), [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged], allowedChains);
                        return [4 /*yield*/, instance.init({ logger: "error" })];
                    case 1:
                        _a.sent();
                        setDAppConnector(instance);
                        return [2 /*return*/];
                }
            });
        }); };
        initConnector();
    }, []);
    var connect = function () { return __awaiter(void 0, void 0, void 0, function () {
        var setupSigner, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dAppConnector)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dAppConnector.openModal()];
                case 2:
                    _a.sent();
                    setupSigner = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var userSigner, accountId;
                        return __generator(this, function (_a) {
                            if (!dAppConnector || dAppConnector.signers.length === 0)
                                return [2 /*return*/];
                            userSigner = dAppConnector.signers[0];
                            accountId = userSigner.getAccountId().toString();
                            getHederaAccountData(accountId)
                                .then(function (res) {
                                var tokens = res.tokens, hbarBalance = res.hbarBalance, transactions = res.transactions;
                                setTokens(tokens);
                                setBalance(hbarBalance);
                                setTransactionsHistory(transactions);
                            })
                                .catch(function (e) { return console.log(e); });
                            console.log("this is a test", userSigner, accountId, balance);
                            setSigner(userSigner);
                            setAccount(accountId);
                            setIsConnected(true);
                            return [2 /*return*/];
                        });
                    }); };
                    setupSigner();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Wallet connection failed:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var disconnect = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dAppConnector) return [3 /*break*/, 2];
                    return [4 /*yield*/, dAppConnector.disconnectAll()];
                case 1:
                    _a.sent();
                    setAccount(undefined);
                    setBalance(undefined);
                    setTokens(undefined);
                    setIsConnected(false);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () { }, [dAppConnector]);
    return (_jsx(HederaWalletContext.Provider, { value: {
            dAppConnector: dAppConnector,
            isConnected: isConnected,
            account: account,
            balance: balance,
            tokens: tokens,
            signer: signer,
            transactionHistory: transactionHistory,
            connect: connect,
            disconnect: disconnect,
        }, children: children }));
};
export var useHederaWallet = function () {
    return useContext(HederaWalletContext);
};
//# sourceMappingURL=HederaProvider.js.map