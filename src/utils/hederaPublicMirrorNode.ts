import axios from "axios";

const hederaMirrorNodeClient = axios.create({
    baseURL: "https://mainnet-public.mirrornode.hedera.com/api/v1",
    timeout: 10000,
    headers: {
        Accept: "application/json",
    },
});

export default hederaMirrorNodeClient;
