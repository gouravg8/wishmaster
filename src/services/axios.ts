import axios from "axios";

const BASE_URL = import.meta.env.DEV ? "https://fkdashboarddev.synlabs.io" : "/";

function forceLogout() {
    localStorage.clear();
    window.location.href = "/";
}

class HttpService {
    static Instance() {
        let ax = axios.create({
            baseURL: BASE_URL,
            timeout: 30000,
            headers: {
                "Content-Type": "application/json",
            },
        });

        ax.interceptors.request.use((config) => {
            let user = JSON.parse(localStorage.getItem("smoothOpsUser"));
            if (user?.token) {
                config.headers.Authorization = "Bearer " + user.token;
            }
            return config;
        });

        ax.interceptors.response.use(undefined, (err) => {
            if (err.code === "ECONNABORTED") {
                return Promise.reject({ response: { data: { message: "Request Timed Out" } } });
            }

            if (err.code === "ERR_NETWORK") {
                return Promise.reject({ response: { data: { message: "Network Timed Out" } } });
            }

            if (err.response.config.url.includes("/login")) return Promise.reject(err);

            if (err.response.status === 401) {
                console.log("forcing logout on 401!!");
                return forceLogout();
            }

            if (err.response.status !== 403) {
                return Promise.reject(err);
            }
        });
        return ax;
    }
}

export default HttpService.Instance();