export const formatTime = (isoDate: string) => {
    const parsedDate = new Date(isoDate);
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric', 
        hour12: false
     }).format(parsedDate);
}