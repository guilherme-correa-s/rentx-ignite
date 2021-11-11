import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { UserRepository } from '../../repositories/implementations/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepositorty: UserRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepositorty.findByEmail(email);
    if (!user) throw Error('Email or password incorrect!');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error('Email or password incorrect!');

    const token = sign({}, 'd41d8cd98f00b204e9800998ecf8427e', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}
