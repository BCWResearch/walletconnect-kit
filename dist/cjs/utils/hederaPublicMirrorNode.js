"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var hederaMirrorNodeClient = axios_1.default.create({
    baseURL: "https://mainnet-public.mirrornode.hedera.com/api/v1",
    headers: {
        Accept: "application/json",
    },
});
exports.default = hederaMirrorNodeClient;
//# sourceMappingURL=hederaPublicMirrorNode.js.map