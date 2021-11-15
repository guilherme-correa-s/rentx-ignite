import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { ICarsRepository } from '../../repositories/ICarsRepository';

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(createCarDTO: ICreateCarDTO): Promise<void> {
    const licensePlateAlreadyExists =
      await this.carsRepository.findCarByLicensePlate(
        createCarDTO.license_plate,
      );

    if (licensePlateAlreadyExists)
      throw new AppError('License plate already exists');

    await this.carsRepository.create(createCarDTO);
  }
}
