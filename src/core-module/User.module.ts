import { Module } from '@nestjs/common';

import { UserRepository } from '@src/database/entity/User/User.repository';
import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';
import { TypeormEntityModule } from '@src/database/TypeormEntity.module';

import { UserController } from '@src/core-api/user/controller/v1/User.controller';

import { UserCreator } from '@src/core-domain/user/User.creator';
import { UserReader } from '@src/core-domain/user/User.reader';
import { UserService } from '@src/core-domain/user/User.service';

@Module({
  imports: [TypeormEntityModule.forCustomRepository([UserRepository, UserTokenRepository])],
  controllers: [UserController],
  providers: [UserService, UserReader, UserCreator],
})
export class UserModule {}
