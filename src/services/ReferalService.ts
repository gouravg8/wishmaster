import axios from "./axios";

export type CreateNewReferralType = {
    name: string;
    model: "trueflex" | "kirana";
    phone: string;
    pan_number: string;
    aadhaar_number: string;
}

export const createNewReferral = (payload: CreateNewReferralType) => {
    return axios.post("/api/v1/referral", payload);
}

export const getMyReferrals = (payload: CreateNewReferralType) => {
    return axios.post("/api/v1/referral/my", payload);
}