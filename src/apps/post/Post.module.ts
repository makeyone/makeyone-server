import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';
import { PostFoamEntity } from '@src/libs/entity/domain/post/PostFoam.entity';
import { PostHousingEntity } from '@src/libs/entity/domain/post/PostHousing.entity';
import { PostImageEntity } from '@src/libs/entity/domain/post/PostImage.entity';
import { PostKeyboardDefinitionEntity } from '@src/libs/entity/domain/post/PostKeyboardDefinition.entity';
import { PostKeycapEntity } from '@src/libs/entity/domain/post/PostKeycap.entity';
import { PostPCBEntity } from '@src/libs/entity/domain/post/PostPCB.entity';
import { PostPlateEntity } from '@src/libs/entity/domain/post/PostPlate.entity';
import { PostSettingEntity } from '@src/libs/entity/domain/post/PostSetting.entity';
import { PostStabilizerEntity } from '@src/libs/entity/domain/post/PostStabilizer.entity';
import { PostSwitchEntity } from '@src/libs/entity/domain/post/PostSwitch.entity';
import { PostVideoEntity } from '@src/libs/entity/domain/post/PostVideo.entity';
import { EntityModule } from '@src/libs/entity/Entity.module';

import { PostController } from '@src/apps/post/Post.controller';
import { PostService } from '@src/apps/post/Post.service';
import { PostFoamQueryRepository } from '@src/apps/post/PostFoamQueryRepository';
import { PostHousingQueryRepository } from '@src/apps/post/PostHousingQueryRepository';
import { PostImageQueryRepository } from '@src/apps/post/PostImageQueryRepository';
import { PostKeyboardDefinitionQueryRepository } from '@src/apps/post/PostKeyboardDefinitionQueryRepository';
import { PostKeycapQueryRepository } from '@src/apps/post/PostKeycapQueryRepository';
import { PostPCBQueryRepository } from '@src/apps/post/PostPCBQueryRepository';
import { PostPlateQueryRepository } from '@src/apps/post/PostPlateQueryRepository';
import { PostQueryRepository } from '@src/apps/post/PostQueryRepository';
import { PostSettingQueryRepository } from '@src/apps/post/PostSettingQueryRepository';
import { PostStabilizerQueryRepository } from '@src/apps/post/PostStabilizerQueryRepository';
import { PostSwitchQueryRepository } from '@src/apps/post/PostSwitchQueryRepository';
import { PostVideoQueryRepository } from '@src/apps/post/PostVideoQueryRepository';

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
      PostPlateEntity,
      PostFoamEntity,
      PostVideoEntity,
      PostSettingEntity,
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
      PostPlateQueryRepository,
      PostFoamQueryRepository,
      PostVideoQueryRepository,
      PostSettingQueryRepository,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
