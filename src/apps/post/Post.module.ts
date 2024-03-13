import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';
import { PostHousingEntity } from '@src/libs/entity/domain/post/PostHousing.entity';
import { PostImageEntity } from '@src/libs/entity/domain/post/PostImage.entity';
import { PostKeyboardDefinitionEntity } from '@src/libs/entity/domain/post/PostKeyboardDefinition.entity';
import { PostKeycapEntity } from '@src/libs/entity/domain/post/PostKeycap.entity';
import { PostPCBEntity } from '@src/libs/entity/domain/post/PostPCB.entity';
import { PostStabilizerEntity } from '@src/libs/entity/domain/post/PostStabilizer.entity';
import { PostSwitchEntity } from '@src/libs/entity/domain/post/PostSwitch.entity';
import { EntityModule } from '@src/libs/entity/Entity.module';

import { PostController } from '@src/apps/post/Post.controller';
import { PostService } from '@src/apps/post/Post.service';
import { PostHousingQueryRepository } from '@src/apps/post/PostHousingQueryRepository';
import { PostImageQueryRepository } from '@src/apps/post/PostImageQueryRepository';
import { PostKeyboardDefinitionQueryRepository } from '@src/apps/post/PostKeyboardDefinitionQueryRepository';
import { PostKeycapQueryRepository } from '@src/apps/post/PostKeycapQueryRepository';
import { PostPCBQueryRepository } from '@src/apps/post/PostPCBQueryRepository';
import { PostQueryRepository } from '@src/apps/post/PostQueryRepository';
import { PostStabilizerQueryRepository } from '@src/apps/post/PostStabilizerQueryRepository';
import { PostSwitchQueryRepository } from '@src/apps/post/PostSwitchQueryRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
      PostImageEntity,
      PostHousingEntity,
      PostSwitchEntity,
      PostKeycapEntity,
      PostStabilizerEntity,
      PostKeyboardDefinitionEntity,
      PostPCBEntity,
    ]),
    EntityModule.forCustomRepository([
      PostQueryRepository,
      PostImageQueryRepository,
      PostHousingQueryRepository,
      PostSwitchQueryRepository,
      PostKeycapQueryRepository,
      PostStabilizerQueryRepository,
      PostKeyboardDefinitionQueryRepository,
      PostPCBQueryRepository,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
