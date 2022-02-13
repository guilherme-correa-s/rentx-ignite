import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = []
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
    }

    async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            id: '1233456',
            car_id,
            user_id,
            start_date: new Date(),
            expected_return_date
        });

        this.rentals.push(rental);

        return rental;
    }
}