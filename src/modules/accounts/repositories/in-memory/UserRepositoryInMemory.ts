import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UserRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    const cryptPassword = await hash(password, 8);

    user.id = uuidV4();

    Object.assign(user, {
      name,
      password: cryptPassword,
      email,
      driver_license,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}
