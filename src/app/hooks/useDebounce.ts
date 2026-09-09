import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500, enabled = true): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        if (!enabled) {
            setDebouncedValue(value);
            return;
        }

        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay, enabled]);

    return enabled ? debouncedValue : value;
}
