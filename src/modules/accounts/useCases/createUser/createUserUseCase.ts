import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(createUserDTO: ICreateUserDTO): Promise<void> {
    const userAlreadyExist = await this.userRepository.findByEmail(
      createUserDTO.email,
    );

    if (userAlreadyExist) {
      throw new Error('User already exists!');
    }

    await this.userRepository.create(createUserDTO);
  }
}