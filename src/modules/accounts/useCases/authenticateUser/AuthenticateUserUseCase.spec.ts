import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000321',
      email: 'user@rentx.com',
      password: '123',
      name: 'Test User',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able authenticate an incorrect email', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000321',
        email: 'user@rentx.com',
        password: '123',
        name: 'Test User',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'invalid@email.com.br',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able authenticate an incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000321',
        email: 'user@rentx.com',
        password: '123',
        name: 'Test User',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalidPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
