import { useCallback, useEffect, useState } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearError = useCallback(() => {
        setError(null);
    }, [])

    const request = useCallback(async (url, method = "GET", body = null, headers = { "Content-Type": "application/json" }, answer = true, text = false) => {
        setLoading(true);
        try {
            let res = await fetch(url, { method, body, headers });

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }

            if (answer) {
                if (!text) {
                    const data = await res.json();

                    setLoading(false);
                    return data;
                } else {
                    const data = await res.text();

                    setLoading(false);
                    return data;
                }
            } else {
                const data = await res.arrayBuffer();

                setLoading(false);
                return data;
            }
        } catch (e) {
            setLoading(false);
            setError(e);
            throw e;
        }

    }, []);

    return { loading, error, request, clearError };
}