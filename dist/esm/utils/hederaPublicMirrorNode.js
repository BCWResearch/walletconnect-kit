import axios from "axios";
var hederaMirrorNodeClient = axios.create({
    baseURL: "https://mainnet-public.mirrornode.hedera.com/api/v1",
    headers: {
        Accept: "application/json",
    },
});
export default hederaMirrorNodeClient;
//# sourceMappingURL=hederaPublicMirrorNode.js.map