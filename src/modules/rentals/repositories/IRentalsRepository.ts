import { Rental } from "../infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO'

export interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create(createRental: ICreateRentalDTO): Promise<Rental>;
}