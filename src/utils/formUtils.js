/**
 * formUtils.js - Helpers for data transformation and export
 */

/**
 * Flattens a nested object into a single level object with dot notation for headers.
 * Special handling for arrays (e.g., team members or budget items).
 */
export const flattenFormData = (data, prefix = '') => {
    return Object.keys(data).reduce((acc, key) => {
        const value = data[key];
        const newKey = prefix ? `${prefix}_${key}` : key;

        if (Array.isArray(value)) {
            // Flatten arrays by index
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    const flattenedItem = flattenFormData(item, `${newKey}_${index + 1}`);
                    Object.assign(acc, flattenedItem);
                } else {
                    acc[`${newKey}_${index + 1}`] = item;
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            // Recursive call for objects
            Object.assign(acc, flattenFormData(value, newKey));
        } else {
            // Primative values
            acc[newKey] = value;
        }

        return acc;
    }, {});
};

/**
 * Converts a flat object into a CSV string (Header row + Data row)
 */
export const jsonToCSV = (flattenedData) => {
    const headers = Object.keys(flattenedData);
    const values = headers.map(header => {
        let val = flattenedData[header];
        // Handle values containing commas or quotes
        if (typeof val === 'string') {
            val = val.replace(/"/g, '""'); // Escape double quotes
            if (val.includes(',') || val.includes('\n') || val.includes('"')) {
                val = `"${val}"`;
            }
        }
        return val;
    });

    return [
        headers.join(','),
        values.join(',')
    ].join('\n');
};

/**
 * Helper to download data locally (useful for debugging or secondary backup)
 */
export const downloadCSV = (csvString, filename = 'grant_application.csv') => {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
