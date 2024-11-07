export const headerFormatter = (fieldName) => {
    let header = fieldName.replaceAll("_", " ");
    const firstChar = header.charAt(0);
    const replceFirstChar = firstChar.toUpperCase();
    header = header.replace(firstChar, replceFirstChar)
    return header;
}