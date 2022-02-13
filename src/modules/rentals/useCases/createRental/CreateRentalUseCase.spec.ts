import dayjs from 'dayjs';

import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implemetations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  const add24hours = dayjs().add(1, 'day').utc().toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '12345',
      expected_return_date: add24hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '12345',
        expected_return_date: add24hours,
      });

      const rental = await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '12345',
        expected_return_date: add24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '54321',
        car_id: '12345',
        expected_return_date: add24hours,
      });

      const rental = await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '12345',
        expected_return_date: add24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able create a new rental with invalid return expected date', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '12345',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
