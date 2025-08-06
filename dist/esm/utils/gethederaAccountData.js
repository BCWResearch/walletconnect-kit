import { __awaiter, __generator } from "tslib";
import axios from "axios";
var BASE_URL = "https://mainnet-public.mirrornode.hedera.com/api/v1";
export var getHederaAccountData = function (accountId) { return __awaiter(void 0, void 0, void 0, function () {
    var accountUrl, txUrl, _a, accountRes, txRes, balance, transactions;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                accountUrl = "".concat(BASE_URL, "/accounts/").concat(accountId);
                txUrl = "".concat(BASE_URL, "/transactions?account.id=").concat(accountId);
                return [4 /*yield*/, Promise.all([axios.get(accountUrl), axios.get(txUrl)])];
            case 1:
                _a = _b.sent(), accountRes = _a[0], txRes = _a[1];
                balance = accountRes.data.balance;
                transactions = txRes.data.transactions;
                return [2 /*return*/, { hbarBalance: balance.balance, tokens: balance.tokens, transactions: transactions }];
        }
    });
}); };
//# sourceMappingURL=gethederaAccountData.js.map