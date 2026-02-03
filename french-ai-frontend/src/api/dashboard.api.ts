import axios from "axios";

export async function getDashboard() {
    const res = await axios.get("/api/dashboard", {
        withCredentials: true // if session-based
    });
    return res.data;
}
