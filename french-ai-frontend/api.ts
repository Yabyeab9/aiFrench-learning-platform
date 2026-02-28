export async function api<T = unknown>(url: string, options: RequestInit = {}): Promise<T> {
    const base = (typeof window !== 'undefined' && window.location) ? '' : '';
    const res = await fetch(`${base}http://localhost:8080${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers as Record<string, string> | undefined),
        },
        ...options,
    });

    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<T>;
}
