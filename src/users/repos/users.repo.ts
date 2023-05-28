import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseModelNames } from 'src/common/constants';
import { BaseRepo } from 'src/common/utils/base.repo';
import { User, UserDocument } from '../schemas/users.schema';

export class UsersRepo extends BaseRepo<User> {
  constructor(
    @InjectModel(DatabaseModelNames.USER_MODEL)
    private _usersModel: Model<UserDocument>,
  ) {
    super(_usersModel);
  }
}
