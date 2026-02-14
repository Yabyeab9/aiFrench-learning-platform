import axios from "axios";

export async function getDashboard() {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get("/api/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}
