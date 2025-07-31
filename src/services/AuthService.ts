import axios from "./axios"

type ValidateOtpType = {
    phone: string;
    otp: string;
}

export const getOtp = (phone: string, signal?: AbortSignal) => {
    return axios.post("/auth/wm/login", { phone }, { signal });
}

export const validateOtp = (payload: ValidateOtpType) => {
    return axios.post("/auth/wm/login/verify/otp", payload);
}