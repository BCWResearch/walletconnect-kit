"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCosmoWallet = exports.useEvmWallet = exports.useHederaWallet = void 0;
var HederaProvider_1 = require("../provider/hedera/HederaProvider");
Object.defineProperty(exports, "useHederaWallet", { enumerable: true, get: function () { return HederaProvider_1.useHederaWallet; } });
var EVMProvider_1 = require("../provider/evm/EVMProvider");
Object.defineProperty(exports, "useEvmWallet", { enumerable: true, get: function () { return EVMProvider_1.useEvmWallet; } });
var CosmoProvider_1 = require("../provider/cosmos/CosmoProvider");
Object.defineProperty(exports, "useCosmoWallet", { enumerable: true, get: function () { return CosmoProvider_1.useCosmoWallet; } });
//# sourceMappingURL=index.js.map