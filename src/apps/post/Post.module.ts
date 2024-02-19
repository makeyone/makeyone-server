import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';
import { PostImageEntity } from '@src/libs/entity/domain/post/PostImage.entity';
import { EntityModule } from '@src/libs/entity/Entity.module';

import { PostController } from '@src/apps/post/Post.controller';
import { PostService } from '@src/apps/post/Post.service';
import { PostImageQueryRepository } from '@src/apps/post/PostImageQueryRepository';
import { PostQueryRepository } from '@src/apps/post/PostQueryRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, PostImageEntity]),
    EntityModule.forCustomRepository([PostQueryRepository, PostImageQueryRepository]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
