/**
 * Get parsed item from local storage
 *
 * @param {String} key - Item key
 * @returns {any|undefined} - Parsed value of item if key exists on client browser, otherwise undefined
 */
export const getSerializedStorageItem = key => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return undefined;
        }
        return JSON.parse(serializedValue);
    } catch (err) {
        return undefined;
    }
};

/**
 * Set new item on local storage
 *
 * @param {String} key - Item key
 * @param {any} value - Item value
 * @returns {boolean} - Success of operation
 */
export const storageSetItem = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));

            return true;
        } catch (err) {
            return false
        }
};