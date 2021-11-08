import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoriesService } from '../modules/cars/services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (request, response) => {
  const repositories = categoriesRepository.listAllCategories();

  return response.json(repositories);
});

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoriesService = new CreateCategoriesService(
    categoriesRepository,
  );

  createCategoriesService.execute({ name, description });

  return response.status(201).send();
});

export { categoriesRoutes };
