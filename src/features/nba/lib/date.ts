export function formatDateToYYYYMMDD(date: Date): string {
    return date.toISOString().slice(0, 10);
}

export function formatDateToKoreaYYYYMMDD(date: Date): string {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}

export function addDays(date: Date, days: number): Date {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + days);
    return nextDate;
}