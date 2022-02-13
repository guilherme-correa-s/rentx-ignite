import { container } from 'tsyringe';
import './providers/index';

import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { CarsImagesRespository } from '../../modules/cars/infra/typeorm/repositories/CarsImagesRespository';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { ICarsImagesRepository } from '../../modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRespository,
);

container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository)
