import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const newCategory = this.repository.create({ name, description });
    await this.repository.save(newCategory);
  }

  async listAllCategories(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}
