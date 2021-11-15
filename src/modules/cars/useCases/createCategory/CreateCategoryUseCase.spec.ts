import { AppError } from '../../../../shared/errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Name category test',
      description: 'Description Category test',
    };

    await createCategoryUseCase.execute(category);

    const result = await categoriesRepositoryInMemory.findByName(category.name);

    expect(result.name).toBe(category.name);
  });

  it('should not be able to create a new category with name already exist', async () => {
    const category = {
      name: 'Name category test',
      description: 'Description Category test',
    };

    expect(async () => {
      await createCategoryUseCase.execute(category);

      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
