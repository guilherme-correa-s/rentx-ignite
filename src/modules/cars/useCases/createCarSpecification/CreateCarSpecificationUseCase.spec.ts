import { ICarsRepository } from '../../repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let specificationsRepositoryInMemory: ISpecificationsRepository;
let carsRepositoryInMemory: ICarsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const newCar = await carsRepositoryInMemory.create({
      name: 'carro test 1',
      description: 'description test',
      daily_rate: 100,
      license_plate: 'license test',
      fine_amount: 50,
      brand: 'test',
      category_id: null,
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'test',
      description: 'specification test',
    });

    const specification2 = await specificationsRepositoryInMemory.create({
      name: 'test2',
      description: 'specification test2',
    });

    const specifications_id = [specification.id, specification2.id];

    await createCarSpecificationUseCase.execute({
      car_id: newCar.id,
      specifications_id,
    });

    const car = await carsRepositoryInMemory.findCarById(newCar.id);
    console.log(car);
    expect(car).toHaveProperty('specifications');
    expect(car.specifications).toHaveLength(2);
  });
});
