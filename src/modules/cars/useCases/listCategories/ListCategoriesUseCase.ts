import { Category } from '../../model/Category';
import { CategoriesRepository } from '../../repositories/CategoriesRepository';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.listAllCategories();
  }
}
