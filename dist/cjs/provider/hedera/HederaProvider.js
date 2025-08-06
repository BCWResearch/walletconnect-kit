"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHederaWallet = exports.HederaWalletProvider = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var sdk_1 = require("@hashgraph/sdk");
var hedera_wallet_connect_1 = require("@hashgraph/hedera-wallet-connect");
var react_1 = require("react");
var gethederaAccountData_1 = require("../../utils/gethederaAccountData");
var HederaWalletContext = (0, react_1.createContext)({
    dAppConnector: undefined,
    isConnected: false,
    account: undefined,
    balance: undefined,
    tokens: undefined,
    signer: undefined,
    transactionHistory: undefined,
    connect: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/];
    }); }); },
    disconnect: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/];
    }); }); },
});
var HederaWalletProvider = function (_a) {
    var children = _a.children, projectId = _a.projectId, _b = _a.metadata, metadata = _b === void 0 ? {
        name: "Hedera Wallet Connect",
        description: "Hedera Wallet Connect",
        url: window.location.origin,
        icons: [window.location.origin],
    } : _b, _c = _a.ledgerId, ledgerId = _c === void 0 ? sdk_1.LedgerId.MAINNET : _c, _d = _a.allowedChains, allowedChains = _d === void 0 ? [hedera_wallet_connect_1.HederaChainId.Mainnet, hedera_wallet_connect_1.HederaChainId.Testnet] : _d;
    var _e = (0, react_1.useState)(undefined), dAppConnector = _e[0], setDAppConnector = _e[1];
    var _f = (0, react_1.useState)(undefined), account = _f[0], setAccount = _f[1];
    var _g = (0, react_1.useState)(undefined), balance = _g[0], setBalance = _g[1];
    var _h = (0, react_1.useState)(undefined), tokens = _h[0], setTokens = _h[1];
    var _j = (0, react_1.useState)(undefined), transactionHistory = _j[0], setTransactionsHistory = _j[1];
    var _k = (0, react_1.useState)(false), isConnected = _k[0], setIsConnected = _k[1];
    var _l = (0, react_1.useState)(undefined), signer = _l[0], setSigner = _l[1];
    (0, react_1.useEffect)(function () {
        var initConnector = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var instance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = new hedera_wallet_connect_1.DAppConnector(metadata, ledgerId, projectId, Object.values(hedera_wallet_connect_1.HederaJsonRpcMethod), [hedera_wallet_connect_1.HederaSessionEvent.ChainChanged, hedera_wallet_connect_1.HederaSessionEvent.AccountsChanged], allowedChains);
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
    var connect = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var setupSigner, error_1;
        return tslib_1.__generator(this, function (_a) {
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
                    setupSigner = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var userSigner, accountId;
                        return tslib_1.__generator(this, function (_a) {
                            if (!dAppConnector || dAppConnector.signers.length === 0)
                                return [2 /*return*/];
                            userSigner = dAppConnector.signers[0];
                            accountId = userSigner.getAccountId().toString();
                            (0, gethederaAccountData_1.getHederaAccountData)(accountId)
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
    var disconnect = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
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
    (0, react_1.useEffect)(function () { }, [dAppConnector]);
    return ((0, jsx_runtime_1.jsx)(HederaWalletContext.Provider, { value: {
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
exports.HederaWalletProvider = HederaWalletProvider;
var useHederaWallet = function () {
    return (0, react_1.useContext)(HederaWalletContext);
};
exports.useHederaWallet = useHederaWallet;
//# sourceMappingURL=HederaProvider.js.map