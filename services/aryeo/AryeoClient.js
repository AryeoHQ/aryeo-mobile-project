import axios from "axios";

const aryeoClient = axios.create({
    baseURL: `https://api.aryeo.com/v1`,
});

export default aryeoClient;

export function authHeaders() {
    return {
        "Authorization": `Bearer [API_KEY]`,
        "Aryeo-Group-Id": `6da2f0f0-2dc5-4b88-b1ad-e2c510729b37`,
    };
}
