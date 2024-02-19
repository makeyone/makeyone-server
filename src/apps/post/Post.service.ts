import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';
import { PostHousingEntity } from '@src/libs/entity/domain/post/PostHousing.entity';
import { PostImageEntity } from '@src/libs/entity/domain/post/PostImage.entity';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

import { CreatePostOutput } from '@src/apps/post/dto/CreatePost.dto';
import { EditPostHousingInput, EditPostHousingOutput, EditPostHousingParam } from '@src/apps/post/dto/EditPostHousing.dto';
import { EditPostImagesInput, EditPostImagesOutput, EditPostImagesParam } from '@src/apps/post/dto/EditPostImages.dto';
import { EditPostTitleInput, EditPostTitleOutput, EditPostTitleParam } from '@src/apps/post/dto/EditPostTitle.dto';
import { GetPostByIdOutput, GetPostByIdParam } from '@src/apps/post/dto/GetPostById.dto';
import { PostHousingQueryRepository } from '@src/apps/post/PostHousingQueryRepository';
import { PostQueryRepository } from '@src/apps/post/PostQueryRepository';

@Injectable()
export class PostService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly postQueryRepository: PostQueryRepository,
    @InjectRepository(PostImageEntity)
    private readonly postImageRepository: Repository<PostImageEntity>,
    @InjectRepository(PostHousingEntity)
    private readonly postHousingRepository: Repository<PostHousingEntity>,
    private readonly postHousingQueryRepository: PostHousingQueryRepository,
  ) {}

  async getPostById({ postId }: GetPostByIdParam): Promise<GetPostByIdOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }

    return {
      ok: true,
      post,
    };
  }

  async createPost(me: UserEntity): Promise<CreatePostOutput> {
    const createdPost = await this.postRepository.save(this.postRepository.create({ postedUser: me }));

    return {
      ok: true,
      createdPostId: createdPost.id,
    };
  }

  async editPostTitle(
    me: UserEntity,
    { postId }: EditPostTitleParam,
    { postTitle }: EditPostTitleInput,
  ): Promise<EditPostTitleOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    await this.postRepository.update(postId, { postTitle });

    return {
      ok: true,
      editedPostId: postId,
    };
  }

  async editPostImages(
    me: UserEntity,
    { postId }: EditPostImagesParam,
    { postImages }: EditPostImagesInput,
  ): Promise<EditPostImagesOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    await this.dataSource.transaction(async (manager) => {
      const postImageRepository = manager.withRepository(this.postImageRepository);
      await postImageRepository.delete({ post: { id: postId } });
      for (const image of postImages) {
        await postImageRepository.save(
          postImageRepository.create({
            imageUrl: image,
            post: {
              id: postId,
            },
          }),
        );
      }
    });

    return {
      ok: true,
      editedPostId: postId,
    };
  }

  async editPostHousing(
    me: UserEntity,
    { postId }: EditPostHousingParam,
    {
      housingName,
      housingColor,
      housingMount,
      housingLayout,
      housingWindowKeyLayout,
      housingFunctionKeyLayout,
      isHousingReAnodized,
    }: EditPostHousingInput,
  ): Promise<EditPostHousingOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    const postHousing = await this.postHousingQueryRepository.findPostHousingByPostId(postId);
    await this.postHousingRepository.save({
      ...(postHousing && { id: postHousing.id }),
      housingName,
      housingColor,
      housingMount,
      housingLayout,
      housingWindowKeyLayout,
      housingFunctionKeyLayout,
      isHousingReAnodized,
      post: {
        id: postId,
      },
    });

    return {
      ok: true,
      editedPostId: postId,
    };
  }
}
