import { DateTime } from "luxon";

export function getLocalStorageWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const expiry = DateTime.fromISO(item.expiry);
    const now = DateTime.now();
    if (now >= expiry) {
        localStorage.removeItem(key); // Удалить устаревшие данные
        if (key === 'token') localStorage.removeItem("basketId");
        return null;
    }
    return item.value;
}