"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCosmoWallet = exports.CosmoWalletProvider = exports.getKeplr = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var provider_extension_1 = require("@keplr-wallet/provider-extension");
var react_1 = require("react");
var CosmosWalletContext = (0, react_1.createContext)(undefined);
var getKeplr = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var keplr, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, provider_extension_1.Keplr.getKeplr()];
            case 1:
                keplr = _a.sent();
                if (!keplr)
                    throw new Error("Keplr not found");
                return [2 /*return*/, keplr];
            case 2:
                err_1 = _a.sent();
                console.error("Failed to get Keplr:", err_1);
                return [2 /*return*/, undefined];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getKeplr = getKeplr;
var CosmoWalletProvider = function (_a) {
    var chains = _a.chains, children = _a.children;
    var _b = (0, react_1.useState)(false), isConnected = _b[0], setIsConnected = _b[1];
    var _c = (0, react_1.useState)(""), address = _c[0], setAddress = _c[1];
    var _d = (0, react_1.useState)(undefined), keplr = _d[0], setKeplr = _d[1];
    var _e = (0, react_1.useState)(undefined), signer = _e[0], setSigner = _e[1];
    var connect = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var keplr_1, signer_1, accounts, err_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, exports.getKeplr)()];
                case 1:
                    keplr_1 = _a.sent();
                    if (!keplr_1) return [3 /*break*/, 4];
                    return [4 /*yield*/, keplr_1.enable(chains)];
                case 2:
                    _a.sent();
                    signer_1 = keplr_1.getOfflineSigner(Array.isArray(chains) ? chains[0] : chains);
                    return [4 /*yield*/, signer_1.getAccounts()];
                case 3:
                    accounts = _a.sent();
                    setKeplr(keplr_1);
                    setAddress(accounts[0].address);
                    setSigner(signer_1);
                    setIsConnected(true);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_2 = _a.sent();
                    console.error("Error connecting Keplr:", err_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var disconnect = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (keplr === null || keplr === void 0 ? void 0 : keplr.disable())];
                case 1:
                    _a.sent();
                    setAddress("");
                    setSigner(undefined);
                    setIsConnected(false);
                    setKeplr(undefined);
                    return [2 /*return*/];
            }
        });
    }); };
    var switchChain = function (chainId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var signer_2, accounts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!keplr) return [3 /*break*/, 3];
                    return [4 /*yield*/, keplr.enable(chainId)];
                case 1:
                    _a.sent();
                    signer_2 = keplr.getOfflineSigner(chainId);
                    return [4 /*yield*/, signer_2.getAccounts()];
                case 2:
                    accounts = _a.sent();
                    setKeplr(keplr);
                    setAddress(accounts[0].address);
                    setSigner(signer_2);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(CosmosWalletContext.Provider, { value: { isConnected: isConnected, address: address, signer: signer, keplr: keplr, connect: connect, disconnect: disconnect, switchChain: switchChain }, children: children }));
};
exports.CosmoWalletProvider = CosmoWalletProvider;
var useCosmoWallet = function () {
    var context = (0, react_1.useContext)(CosmosWalletContext);
    if (!context) {
        throw new Error("useCosmoWallet must be used within an CosmoWalletProvider");
    }
    return context;
};
exports.useCosmoWallet = useCosmoWallet;
//# sourceMappingURL=CosmoProvider.js.map