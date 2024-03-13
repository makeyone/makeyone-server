import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';

import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

import { AuthUser } from '@src/apps/auth/decorators/AuthUser.decorator';
import { RoleGuard } from '@src/apps/auth/decorators/RoleGuard.decorator';
import { CreatePostOutput } from '@src/apps/post/dto/CreatePost.dto';
import { DeletePostPlateOutput, DeletePostPlateParam } from '@src/apps/post/dto/DeletePostPlate.dto';
import { DeletePostVideoOutput, DeletePostVideoParam } from '@src/apps/post/dto/DeletePostVideo.dto';
import { EditPostFoamInput, EditPostFoamOutput, EditPostFoamParam } from '@src/apps/post/dto/EditPostFoam.dto';
import { EditPostHousingInput, EditPostHousingOutput, EditPostHousingParam } from '@src/apps/post/dto/EditPostHousing.dto';
import { EditPostImagesInput, EditPostImagesOutput, EditPostImagesParam } from '@src/apps/post/dto/EditPostImages.dto';
import {
  EditPostKeyboardDefinitionInput,
  EditPostKeyboardDefinitionOutput,
  EditPostKeyboardDefinitionParam,
} from '@src/apps/post/dto/EditPostKeyboardDefinition.dto';
import { EditPostKeycapInput, EditPostKeycapOutput, EditPostKeycapParam } from '@src/apps/post/dto/EditPostKeycap.dto';
import {
  EditPostKeycapOnLayoutInput,
  EditPostKeycapOnLayoutOutput,
  EditPostKeycapOnLayoutParam,
} from '@src/apps/post/dto/EditPostKeycapOnLayout.dto';
import { EditPostPCBInput, EditPostPCBOutput, EditPostPCBParam } from '@src/apps/post/dto/EditPostPCB.dto';
import { EditPostPlateInput, EditPostPlateOutput, EditPostPlateParam } from '@src/apps/post/dto/EditPostPlate.dto';
import {
  EditPostStabilizerInput,
  EditPostStabilizerOutput,
  EditPostStabilizerParam,
} from '@src/apps/post/dto/EditPostStabilizer.dto';
import { EditPostSwitchInput, EditPostSwitchOutput, EditPostSwitchParam } from '@src/apps/post/dto/EditPostSwitch.dto';
import {
  EditPostSwitchOnLayoutInput,
  EditPostSwitchOnLayoutOutput,
  EditPostSwitchOnLayoutParam,
} from '@src/apps/post/dto/EditPostSwitchOnLayout.dto';
import { EditPostTitleInput, EditPostTitleOutput, EditPostTitleParam } from '@src/apps/post/dto/EditPostTitle.dto';
import { EditPostVideoInput, EditPostVideoOutput, EditPostVideoParam } from '@src/apps/post/dto/EditPostVideo.dto';
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

  @RoleGuard(['ANY'])
  @Patch('/:postId/stabilizer')
  async editPostStabilizer(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostStabilizerParam: EditPostStabilizerParam,
    @Body(ValidationPipe) editPostStabilizerInput: EditPostStabilizerInput,
  ): Promise<EditPostStabilizerOutput> {
    return await this.postService.editPostStabilizer(authUser, editPostStabilizerParam, editPostStabilizerInput);
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/keyboard-definition')
  async editPostKeyboardDefinition(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostKeyboardDefinitionParam: EditPostKeyboardDefinitionParam,
    @Body(ValidationPipe) editPostKeyboardDefinitionInput: EditPostKeyboardDefinitionInput,
  ): Promise<EditPostKeyboardDefinitionOutput> {
    return await this.postService.editPostKeyboardDefinition(
      authUser,
      editPostKeyboardDefinitionParam,
      editPostKeyboardDefinitionInput,
    );
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/switch-on-layout')
  async editPostSwitchOnLayout(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostSwitchOnLayoutParam: EditPostSwitchOnLayoutParam,
    @Body(ValidationPipe) editPostSwitchOnLayoutInput: EditPostSwitchOnLayoutInput,
  ): Promise<EditPostSwitchOnLayoutOutput> {
    return await this.postService.editPostSwitchOnLayout(authUser, editPostSwitchOnLayoutParam, editPostSwitchOnLayoutInput);
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/keycap-on-layout')
  async editPostKeycapOnLayout(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostKeycapOnLayoutParam: EditPostKeycapOnLayoutParam,
    @Body(ValidationPipe) editPostKeycapOnLayoutInput: EditPostKeycapOnLayoutInput,
  ): Promise<EditPostKeycapOnLayoutOutput> {
    return await this.postService.editPostKeycapOnLayout(authUser, editPostKeycapOnLayoutParam, editPostKeycapOnLayoutInput);
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/pcb')
  async editPostPCB(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostPCBParam: EditPostPCBParam,
    @Body(ValidationPipe) editPostPCBInput: EditPostPCBInput,
  ): Promise<EditPostPCBOutput> {
    return await this.postService.editPostPCB(authUser, editPostPCBParam, editPostPCBInput);
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/plate')
  async editPostPlate(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostPlateParam: EditPostPlateParam,
    @Body(ValidationPipe) editPostPlateInput: EditPostPlateInput,
  ): Promise<EditPostPlateOutput> {
    return await this.postService.editPostPlate(authUser, editPostPlateParam, editPostPlateInput);
  }

  @RoleGuard(['ANY'])
  @Delete('/:postId/plate')
  async deletePostPlate(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) deletePostPlateParam: DeletePostPlateParam,
  ): Promise<DeletePostPlateOutput> {
    return await this.postService.deletePostPlate(authUser, deletePostPlateParam);
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/foam')
  async editPostFoam(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostFoamParam: EditPostFoamParam,
    @Body(ValidationPipe) editPostFoamInput: EditPostFoamInput,
  ): Promise<EditPostFoamOutput> {
    return await this.postService.editPostFoam(authUser, editPostFoamParam, editPostFoamInput);
  }

  @RoleGuard(['ANY'])
  @Patch('/:postId/video')
  async editPostVideo(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) editPostVideoParam: EditPostVideoParam,
    @Body(ValidationPipe) editPostVideoInput: EditPostVideoInput,
  ): Promise<EditPostVideoOutput> {
    return await this.postService.editPostVideo(authUser, editPostVideoParam, editPostVideoInput);
  }

  @RoleGuard(['ANY'])
  @Delete('/:postId/video')
  async deletePostVideo(
    @AuthUser() authUser: UserEntity,
    @Param(ValidationPipe) deletePostVideoParam: DeletePostVideoParam,
  ): Promise<DeletePostVideoOutput> {
    return await this.postService.deletePostVideo(authUser, deletePostVideoParam);
  }
}
