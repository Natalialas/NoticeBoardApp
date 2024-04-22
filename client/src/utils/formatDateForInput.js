export const formatDateForInput = (isoString) => {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
};