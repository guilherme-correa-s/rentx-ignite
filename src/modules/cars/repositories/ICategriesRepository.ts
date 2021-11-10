import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}
interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;

  listAllCategories(): Promise<Category[]>;

  findByName(name: string): Promise<Category>;
}

export { ICreateCategoryDTO, ICategoriesRepository };
