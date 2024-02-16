import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';

import { RoleGuard } from '@src/apps/auth/decorators/RoleGuard.decorator';
import { GetPostByIdOutput, GetPostByIdParam } from '@src/apps/post/dto/GetPostById.dto';
import { PostService } from '@src/apps/post/Post.service';

@Controller('v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @RoleGuard(['ANY'])
  @Get('/:postId')
  async getPostById(@Param(ValidationPipe) getPostByIdParam: GetPostByIdParam): Promise<GetPostByIdOutput> {
    return await this.postService.getPostById(getPostByIdParam);
  }
}
