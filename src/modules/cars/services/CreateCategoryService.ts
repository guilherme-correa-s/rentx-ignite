import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../repositories/ICategriesRepository';

export class CreateCategoriesService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: ICreateCategoryDTO): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) throw new Error('Category Already exists!');

    this.categoriesRepository.create({ name, description });
  }
}
