export interface IDateProvider {
    compareInHours(date_now: Date, end_date: Date): number;
    convertToUtc(date: Date): string;
    dateNow(): Date;
}