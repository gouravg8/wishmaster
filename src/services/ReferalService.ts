import axios from "./axios";

export type ReferralType = {
    name: string;
    model: "trueflex" | "kirana";
    phone: string;
    pan_number: string;
    aadhaar_number: string;
}

export const createNewReferral = (payload: ReferralType) => {
    return axios.post("/api/v1/referral", payload);
}

export const getMyReferrals = (payload: ReferralType) => {
    return axios.post("/api/v1/referrals/my", payload);
}

export const getSelfReferral = (payload: ReferralType) => {
    return axios.post("/api/v1/referral/my", payload);
}

export const getBadges = () => {
    return axios.get("api/v1/referrals/my/badges");
}

export const getMyStats = (payload: ReferralType) => {
    return axios.post("api/v1/referrals/my/stats", payload);
}