import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { ListAvailableCarsUseCase } from './ListavailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;
let createCarUseCase: CreateCarUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
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

    const cars = await listCarsUseCase.execute({});

    expect(cars).toHaveLength(1);
  });
});
