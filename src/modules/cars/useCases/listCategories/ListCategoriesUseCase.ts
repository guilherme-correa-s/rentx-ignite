import { Category } from '../../entities/Category';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute(): Promise<Category[]> {
    return this.categoriesRepository.listAllCategories();
  }
}
