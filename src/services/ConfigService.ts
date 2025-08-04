import axios from "./axios"

type ModelType = {
    mode: "trueflex" | "kirana"
}

export const listReferrals = () => {
    return axios.get("/api/v1/referral/configs");
}

export const listReferralByModel = (model: ModelType) => {
    return axios.get(`/api/v1/referral/config/${model}`);
}