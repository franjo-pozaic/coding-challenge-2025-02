export const formatDate = (isoDate: string) => {
    if (!isoDate || isoDate.length === 0) {
        return;
    }

    const date = new Date(isoDate);

    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
}