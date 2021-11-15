import { v4 as uuidV4 } from 'uuid';

import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create(createCarDTO: ICreateCarDTO): Promise<void> {
    const car = new Car();

    car.id = uuidV4();
    car.available = true;
    car.created_at = new Date();

    Object.assign(car, {
      ...createCarDTO,
    });

    this.cars.push(car);
  }

  async findCarByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findCarsAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }

      return null;
    });

    return cars;
  }
}
