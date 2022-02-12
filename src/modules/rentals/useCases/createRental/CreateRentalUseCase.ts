interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

export class CreateRentalUseCase {
  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<void> {}
}
