import axios from "axios";
//api叩く際に共通となる部分
// 例えば、baseURLやヘッダーなどを設定するためのaxiosインスタンスを作成します。
const apiClient = axios.create({
    // baseURL: "http://localhost:8000/api",
    baseURL: "process.env.NEXT_PUBLIC_API_BASEURL",
    headers: {
        "Content-Type": "application/json"
    }
});

export default apiClient;
