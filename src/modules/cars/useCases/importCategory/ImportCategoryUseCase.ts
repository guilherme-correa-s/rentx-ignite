import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { CategoriesRepository } from '../../infra/typeorm/repositories/CategoriesRepository';

interface IImportCaregory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async loadCategories(file: Express.Multer.File): Promise<IImportCaregory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCaregory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryNameAlreadyExists =
        await this.categoriesRepository.findByName(name);

      if (!categoryNameAlreadyExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}
