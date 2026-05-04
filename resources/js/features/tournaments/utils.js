
export function generateUniqueFileName(type, fileName) {
    const timestamp = Date.now();
    const prefix = type ? `${type}/` : '';
    
    return `${prefix}${timestamp}-${fileName}`;
};