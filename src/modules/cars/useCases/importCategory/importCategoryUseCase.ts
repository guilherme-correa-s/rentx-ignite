export class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    console.log(file);
  }
}
