import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModelNames } from 'src/common/constants';
import { UsersRepo } from './repos/users.repo';
import { UserSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: DatabaseModelNames.USER_MODEL,
        useFactory: () => {
          const schema = UserSchema;

          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService, UsersRepo],
  controllers: [UsersController],
  exports: [UsersService, UsersRepo],
})
export class UsersModule {}
