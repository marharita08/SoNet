import axios from "axios";
import env from "./envConfig";

const apiClient = axios.create(
    {
        baseURL: env.apiUrl,
        responseType: "json"
    }
);

apiClient.interceptors.request.use(
    (config) => {
        const {accessToken} = JSON.parse(window.localStorage.getItem("context")) || "";
        if (accessToken) {
            config.headers["authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;

apiClient.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        const originalConfig = err.config;
        if (!originalConfig.url.includes("/auth") && err.response
            && err.response.status === 401 && !isRefreshing) {
            isRefreshing = true;
            const context = JSON.parse(window.localStorage.getItem("context"));
            apiClient.post("/auth/refresh", {
                refreshToken: context.refreshToken,
            }).then(({data}) => {
                const {accessToken, refreshToken} = data;
                context.accessToken = accessToken;
                context.refreshToken = refreshToken;
                window.localStorage.setItem("context", JSON.stringify(context));
                isRefreshing = false;
                if (originalConfig.method !== "get") {
                    apiClient.request(originalConfig).then(response => {
                        return response;
                    }).catch(error => {
                        return Promise.reject(error);
                    });
                } else {
                    return apiClient(originalConfig);
                }
            }).catch((_err) => {
                isRefreshing = false;
                return Promise.reject(_err);
            });
        }
        return Promise.reject(err);
    }
);

export default apiClient;
