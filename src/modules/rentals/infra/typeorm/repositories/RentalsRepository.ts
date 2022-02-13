import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.query(`select * from rentals where car_id = $1`, [car_id]);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.query(`select * from rentals where user_id = $1`, [user_id])
    }

    async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date
        });

        return await this.repository.save(rental);
    }

}