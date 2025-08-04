import axios from "./axios";

export const getMyMessages = () => {
    return axios.post("/api/v1/referrals/my/messages");
}

export const markMessagesAsViewed = (id: string) => {
    return axios.post(`/api/v1/referrals/my/messages/viewed/${id}`);
}