import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { CreateCarUseCase } from './CreateCarUseCase';

export class CreateCarContoller {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarDTO: ICreateCarDTO = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    await createCarUseCase.execute(createCarDTO);

    return response.status(204).send();
  }
}
