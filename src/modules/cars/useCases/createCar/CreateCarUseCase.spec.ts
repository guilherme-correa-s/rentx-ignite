import { AppError } from '../../../../shared/errors/AppError';
import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car: ICreateCarDTO = {
      name: 'carro test 1',
      description: 'description test',
      daily_rate: 100,
      license_plate: 'license test',
      fine_amount: 50,
      brand: 'test',
      category_id: null,
    };

    await createCarUseCase.execute(car);

    const carTest = await carsRepositoryInMemory.findCarByLicensePlate(
      car.license_plate,
    );

    expect(car.license_plate).toBe(carTest.license_plate);
  });

  it('should not be able to create a new car is license_plate already exists', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'carro test 1',
        description: 'description test',
        daily_rate: 100,
        license_plate: 'license test',
        fine_amount: 50,
        brand: 'test',
        category_id: null,
      });

      await createCarUseCase.execute({
        name: 'carro test',
        description: 'description test',
        daily_rate: 100,
        license_plate: 'license test',
        fine_amount: 50,
        brand: 'test',
        category_id: null,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car and the property available as true default', async () => {
    const car: ICreateCarDTO = {
      name: 'carro test 1',
      description: 'description test',
      daily_rate: 100,
      license_plate: 'license test',
      fine_amount: 50,
      brand: 'test',
      category_id: null,
    };

    await createCarUseCase.execute(car);

    const carTest = await carsRepositoryInMemory.findCarByLicensePlate(
      car.license_plate,
    );

    expect(carTest.available).toBe(true);
  });
});
