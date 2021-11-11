import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new Error('Token missing!');

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'd41d8cd98f00b204e9800998ecf8427e',
    ) as IPayload;

    const userRepository = new UserRepository();

    const user = userRepository.findById(user_id);

    if (!user) throw new Error('User does not exists!');

    next();
  } catch {
    throw new Error('Invalid Token');
  }
}
