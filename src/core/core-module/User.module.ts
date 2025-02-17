import { Module } from '@nestjs/common';

import { UserController } from '@src/core/core-api/controller/user/v1/User.controller';

import { UserCreator } from '@src/core/core-domain/domain/user/User.creator';
import { UserReader } from '@src/core/core-domain/domain/user/User.reader';
import { UserService } from '@src/core/core-domain/domain/user/User.service';

import { UserRepository } from '@src/database/entity/User/User.repository';
import { UserTokenRepository } from '@src/database/entity/User/UserToken.repository';
import { TypeormEntityModule } from '@src/database/TypeormEntity.module';

@Module({
  imports: [TypeormEntityModule.forCustomRepository([UserRepository, UserTokenRepository])],
  controllers: [UserController],
  providers: [UserService, UserReader, UserCreator],
})
export class UserModule {}
