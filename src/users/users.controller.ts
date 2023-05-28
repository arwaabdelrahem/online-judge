import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private _usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this._usersService.create(body);
  }
}
