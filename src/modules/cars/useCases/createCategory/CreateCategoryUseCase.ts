import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) throw new Error('Category Already exists!');

    await this.categoriesRepository.create({ name, description });
  }
}
