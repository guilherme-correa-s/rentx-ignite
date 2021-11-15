import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(createCarDTO: ICreateCarDTO): Promise<void>;
  findCarByLicensePlate(license_plate: string): Promise<Car>;
  findCarsAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]>;
}
