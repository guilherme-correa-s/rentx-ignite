import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('rentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvicer')
    private readonly dateProvider: IDateProvider,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minHoursRental = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );
    if (carUnavailable) throw new AppError('Car is Unavailable');

    const rentalOPenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );
    if (rentalOPenToUser)
      throw new AppError("There's a rental in progress  for user!");

    const dateNow = this.dateProvider.dateNow();
    const compareReturnDate = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );
    if (compareReturnDate < minHoursRental)
      throw new AppError('Invalid Return Time');

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}
