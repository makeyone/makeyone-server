import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';

import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

import { AuthUser } from '@src/apps/auth/decorators/AuthUser.decorator';
import { RoleGuard } from '@src/apps/auth/decorators/RoleGuard.decorator';
import { CreatePostOutput } from '@src/apps/post/dto/CreatePost.dto';
import { EditPostHousingInput, EditPostHousingOutput, EditPostHousingParam } from '@src/apps/post/dto/EditPostHousing.dto';
import { EditPostImagesInput, EditPostImagesOutput, EditPostImagesParam } from '@src/apps/post/dto/EditPostImages.dto';
import { EditPostKeycapInput, EditPostKeycapOutput, EditPostKeycapParam } from '@src/apps/post/dto/EditPostKeycap.dto';
import { EditPostSwitchInput, EditPostSwitchOutput, EditPostSwitchParam } from '@src/apps/post/dto/EditPostSwitch.dto';
import { EditPostTitleInput, EditPostTitleOutput, EditPostTitleParam } from '@src/apps/post/dto/EditPostTitle.dto';
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

  @RoleGuard(['ANY'])
  @Patch('/:postId/title')
  async editPostTitle(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostTitleParam: EditPostTitleParam,
    @Body(ValidationPipe) editPostTitleInput: EditPostTitleInput,
  ): Promise<EditPostTitleOutput> {
    return await this.postService.editPostTitle(authUser, editPostTitleParam, editPostTitleInput);
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/images')
  async editPostImages(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostImagesParam: EditPostImagesParam,
    @Body(ValidationPipe) editPostImagesInput: EditPostImagesInput,
  ): Promise<EditPostImagesOutput> {
    return await this.postService.editPostImages(authUser, editPostImagesParam, editPostImagesInput);
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/housing')
  async editPostHousing(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostHousingParam: EditPostHousingParam,
    @Body(ValidationPipe) editPostHousingInput: EditPostHousingInput,
  ): Promise<EditPostHousingOutput> {
    return await this.postService.editPostHousing(authUser, editPostHousingParam, editPostHousingInput);
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/switch')
  async editPostSwitch(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostSwitchParam: EditPostSwitchParam,
    @Body(ValidationPipe) editPostSwitchInput: EditPostSwitchInput,
  ): Promise<EditPostSwitchOutput> {
    return await this.postService.editPostSwitch(authUser, editPostSwitchParam, editPostSwitchInput);
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/keycap')
  async editPostKeycap(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostKeycapParam: EditPostKeycapParam,
    @Body(ValidationPipe) editPostKeycapInput: EditPostKeycapInput,
  ): Promise<EditPostKeycapOutput> {
    return await this.postService.editPostKeycap(authUser, editPostKeycapParam, editPostKeycapInput);
  }
}
