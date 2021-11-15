import { inject, injectable } from 'tsyringe';

import { Category } from '../../infra/typeorm/entities/Category';
import { CategoriesRepository } from '../../infra/typeorm/repositories/CategoriesRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.listAllCategories();
    return categories;
  }
}
