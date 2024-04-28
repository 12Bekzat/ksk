export function setLocalStorageWithExpiry(key, value, dateTime) {
    const item = {
        value: value,
        expiry: dateTime // Время в миллисекундах
    };
    localStorage.setItem(key, JSON.stringify(item));
}