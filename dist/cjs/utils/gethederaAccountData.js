"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHederaAccountData = void 0;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var BASE_URL = "https://mainnet-public.mirrornode.hedera.com/api/v1";
var getHederaAccountData = function (accountId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var accountUrl, txUrl, _a, accountRes, txRes, balance, transactions;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                accountUrl = "".concat(BASE_URL, "/accounts/").concat(accountId);
                txUrl = "".concat(BASE_URL, "/transactions?account.id=").concat(accountId);
                return [4 /*yield*/, Promise.all([axios_1.default.get(accountUrl), axios_1.default.get(txUrl)])];
            case 1:
                _a = _b.sent(), accountRes = _a[0], txRes = _a[1];
                balance = accountRes.data.balance;
                transactions = txRes.data.transactions;
                return [2 /*return*/, { hbarBalance: balance.balance, tokens: balance.tokens, transactions: transactions }];
        }
    });
}); };
exports.getHederaAccountData = getHederaAccountData;
//# sourceMappingURL=gethederaAccountData.js.map