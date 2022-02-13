import { container } from "tsyringe";
import { DayjsDateProvider } from './DateProvider/implemetations/DayjsDateProvider';
import { IDateProvider } from './DateProvider/IDateProvider';

container.registerSingleton<IDateProvider>('DayjsDateProvicer', DayjsDateProvider);