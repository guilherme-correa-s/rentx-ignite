export interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<void>;
}
