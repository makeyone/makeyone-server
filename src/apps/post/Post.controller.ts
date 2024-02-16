import { Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';

import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

import { AuthUser } from '@src/apps/auth/decorators/AuthUser.decorator';
import { RoleGuard } from '@src/apps/auth/decorators/RoleGuard.decorator';
import { CreatePostOutput } from '@src/apps/post/dto/CreatePost.dto';
import { GetPostByIdOutput, GetPostByIdParam } from '@src/apps/post/dto/GetPostById.dto';
import { PostService } from '@src/apps/post/Post.service';

@Controller('v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:postId')
  async getPostById(@Param(ValidationPipe) getPostByIdParam: GetPostByIdParam): Promise<GetPostByIdOutput> {
    return await this.postService.getPostById(getPostByIdParam);
  }

  @RoleGuard(['ANY'])
  @Post()
  async createPost(@AuthUser() authUser: UserEntity): Promise<CreatePostOutput> {
    return await this.postService.createPost(authUser);
  }
}
