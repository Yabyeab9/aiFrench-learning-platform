export async function api(url: string, options: any = {}) {
    const res = await fetch(`http://localhost:8080${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) throw new Error("API Error");
    return res.json();
}
