import { Category } from '../model/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}
interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void;

  listAllCategories(): Category[];

  findByName(name: string): Category;
}

export { ICreateCategoryDTO, ICategoriesRepository };
