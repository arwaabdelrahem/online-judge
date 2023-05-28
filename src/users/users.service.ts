import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepo } from './repos/users.repo';

@Injectable()
export class UsersService {
  constructor(private _usersRepo: UsersRepo) {}

  async create(body: CreateUserDto) {
    const user = await this._usersRepo.create(body);

    return user;
  }
}
