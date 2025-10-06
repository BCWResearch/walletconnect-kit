"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversalWalletProvider = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var constant_1 = require("../constant");
var CosmoProvider_1 = require("./cosmos/CosmoProvider");
var EVMProvider_1 = require("./evm/EVMProvider");
var HederaProvider_1 = require("./hedera/HederaProvider");
var UniversalWalletProvider = function (_a) {
    var chains = _a.chains, children = _a.children;
    var wrapped = children;
    chains.forEach(function (_a) {
        var chain = _a.chain, props = _a.props;
        if (chain === constant_1.SupportedChains.HEDERA) {
            wrapped = (0, jsx_runtime_1.jsx)(HederaProvider_1.HederaWalletProvider, tslib_1.__assign({}, props, { children: wrapped }));
        }
        if (chain === constant_1.SupportedChains.EVM) {
            wrapped = (0, jsx_runtime_1.jsx)(EVMProvider_1.EvmWalletProvider, tslib_1.__assign({}, props, { children: wrapped }));
        }
        if (chain === constant_1.SupportedChains.COSMOS) {
            wrapped = (0, jsx_runtime_1.jsx)(CosmoProvider_1.CosmoWalletProvider, tslib_1.__assign({}, props, { children: wrapped }));
        }
    });
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: wrapped });
};
exports.UniversalWalletProvider = UniversalWalletProvider;
//# sourceMappingURL=UniversalWalletProvider.js.map