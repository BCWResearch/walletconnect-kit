import { __assign } from "tslib";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { SupportedChains } from "../constant";
import { EvmWalletProvider } from "./evm/EVMProvider";
import { HederaWalletProvider } from "./hedera/HederaProvider";
export var UniversalWalletProvider = function (_a) {
    var chains = _a.chains, children = _a.children;
    var wrapped = children;
    chains.forEach(function (_a) {
        var chain = _a.chain, props = _a.props;
        if (chain === SupportedChains.HEDERA) {
            wrapped = _jsx(HederaWalletProvider, __assign({}, props, { children: wrapped }));
        }
        if (chain === SupportedChains.EVM) {
            wrapped = _jsx(EvmWalletProvider, __assign({}, props, { children: wrapped }));
        }
    });
    return _jsx(_Fragment, { children: wrapped });
};
//# sourceMappingURL=UniversalWalletProvider.js.map