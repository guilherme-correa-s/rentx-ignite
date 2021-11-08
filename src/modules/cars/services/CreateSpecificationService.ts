import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists)
      throw new Error('Specification Already Exixts!');

    this.specificationsRepository.create({ name, description });
  }
}
