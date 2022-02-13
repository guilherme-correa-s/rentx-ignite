import { IDateProvider } from "../IDateProvider";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
    compareInHours(date_now: Date, end_date: Date): number {
        const date_now_utc = this.convertToUtc(date_now);
        const end_date_utc = this.convertToUtc(end_date);

        return dayjs(end_date_utc).diff(date_now_utc, 'hours');
    }

    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }
}