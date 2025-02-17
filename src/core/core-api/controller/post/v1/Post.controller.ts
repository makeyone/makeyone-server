import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { DeletePostPlateParam } from '@src/core/core-api/controller/post/v1/request/DeletePostPlateReq.dto';
import { DeletePostVideoParam } from '@src/core/core-api/controller/post/v1/request/DeletePostVideoReq.dto';
import {
  EditPostContentParam,
  EditPostContentReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostContentReq.dto';
import { EditPostFoamParam, EditPostFoamReq } from '@src/core/core-api/controller/post/v1/request/EditPostFoamReq.dto';
import {
  EditPostHousingParam,
  EditPostHousingReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostHousingReq.dto';
import {
  EditPostImageListParam,
  EditPostImageListReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostImageListReq.dto';
import {
  EditPostKeyboardDefinitionParam,
  EditPostKeyboardDefinitionReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostKeyboardDefinitionReq.dto';
import {
  EditPostKeycapListParam,
  EditPostKeycapListReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostKeycapListReq.dto';
import {
  EditPostKeycapOnLayoutParam,
  EditPostKeycapOnLayoutReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostKeycapOnLayoutReq.dto';
import {
  EditPostPlateParam,
  EditPostPlateReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostPlateReq.dto';
import {
  EditPostPrintedCircuitBoardParam,
  EditPostPrintedCircuitBoardReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostPrintedCircuitBoardReq.dto';
import {
  EditPostSettingParam,
  EditPostSettingReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostSettingReq.dto';
import {
  EditPostStabilizerListParam,
  EditPostStabilizerListReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostStabilizerListReq.dto';
import {
  EditPostSwitchListParam,
  EditPostSwitchListReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostSwitchListReq.dto';
import {
  EditPostSwitchOnLayoutParam,
  EditPostSwitchOnLayoutReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostSwitchOnLayoutReq.dto';
import {
  EditPostTitleParam,
  EditPostTitleReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostTitleReq.dto';
import {
  EditPostVideoParam,
  EditPostVideoReq,
} from '@src/core/core-api/controller/post/v1/request/EditPostVideoReq.dto';
import { FindPostListQuery } from '@src/core/core-api/controller/post/v1/request/FindPostListReq.dto';
import { FindPostParam } from '@src/core/core-api/controller/post/v1/request/FindPostReq.dto';
import { CreatePostRes } from '@src/core/core-api/controller/post/v1/response/CreatePostRes.dto';
import { DeletePostPlateRes } from '@src/core/core-api/controller/post/v1/response/DeletePostPlateRes.dto';
import { DeletePostVideoRes } from '@src/core/core-api/controller/post/v1/response/DeletePostVideoRes.dto';
import { EditPostContentRes } from '@src/core/core-api/controller/post/v1/response/EditPostContentRes.dto';
import { EditPostFoamRes } from '@src/core/core-api/controller/post/v1/response/EditPostFoamRes.dto';
import { EditPostHousingRes } from '@src/core/core-api/controller/post/v1/response/EditPostHousingRes.dto';
import { EditPostImageListRes } from '@src/core/core-api/controller/post/v1/response/EditPostImageListRes.dto';
import { EditPostKeyboardDefinitionRes } from '@src/core/core-api/controller/post/v1/response/EditPostKeyboardDefinitionRes.dto';
import { EditPostKeycapListRes } from '@src/core/core-api/controller/post/v1/response/EditPostKeycapListRes.dto';
import { EditPostKeycapOnLayoutRes } from '@src/core/core-api/controller/post/v1/response/EditPostKeycapOnLayoutRes.dto';
import { EditPostPlateRes } from '@src/core/core-api/controller/post/v1/response/EditPostPlateRes.dto';
import { EditPostPrintedCircuitBoardRes } from '@src/core/core-api/controller/post/v1/response/EditPostPrintedCircuitBoardRes.dto';
import { EditPostSettingRes } from '@src/core/core-api/controller/post/v1/response/EditPostSettingRes.dto';
import { EditPostStabilizerListRes } from '@src/core/core-api/controller/post/v1/response/EditPostStabilizerListRes.dto';
import { EditPostSwitchListRes } from '@src/core/core-api/controller/post/v1/response/EditPostSwitchListRes.dto';
import { EditPostSwitchOnLayoutRes } from '@src/core/core-api/controller/post/v1/response/EditPostSwitchOnLayoutRes.dto';
import { EditPostTitleRes } from '@src/core/core-api/controller/post/v1/response/EditPostTitleRes.dto';
import { EditPostVideoRes } from '@src/core/core-api/controller/post/v1/response/EditPostVideoRes.dto';
import { FindPostListRes } from '@src/core/core-api/controller/post/v1/response/FindPostListRes.dto';
import { FindPostRes } from '@src/core/core-api/controller/post/v1/response/FindPostRes.dto';
import { AuthUser } from '@src/core/core-api/decorator/auth/AuthUser.decorator';
import { RoleGuard } from '@src/core/core-api/decorator/auth/RoleGuard.decorator';
import { ApiResponse } from '@src/core/core-api/support/response/ApiResponse';

import { TargetPostWithUserData } from '@src/core/core-domain/domain/post/data/TargetPostWithUserData';
import { PostService } from '@src/core/core-domain/domain/post/Post.service';
import { PostFoamService } from '@src/core/core-domain/domain/post/PostFoam.service';
import { PostHousingService } from '@src/core/core-domain/domain/post/PostHousing.service';
import { PostImageService } from '@src/core/core-domain/domain/post/PostImage.service';
import { PostKeyboardDefinitionService } from '@src/core/core-domain/domain/post/PostKeyboardDefinition.service';
import { PostKeycapService } from '@src/core/core-domain/domain/post/PostKeycap.service';
import { PostPlateService } from '@src/core/core-domain/domain/post/PostPlate.service';
import { PostPrintedCircuitBoardService } from '@src/core/core-domain/domain/post/PostPrintedCircuitBoard.service';
import { PostStabilizerService } from '@src/core/core-domain/domain/post/PostStabilizer.service';
import { PostSwitchService } from '@src/core/core-domain/domain/post/PostSwitch.service';
import { PostVideoService } from '@src/core/core-domain/domain/post/PostVideo.service';
import { FindUserResult } from '@src/core/core-domain/domain/user/result/FindUserResult';

@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postImageService: PostImageService,
    private readonly postHousingService: PostHousingService,
    private readonly postSwitchService: PostSwitchService,
    private readonly postKeycapService: PostKeycapService,
    private readonly postStabilizerService: PostStabilizerService,
    private readonly postKeyboardDefinitionService: PostKeyboardDefinitionService,
    private readonly postPrintedCircuitBoardService: PostPrintedCircuitBoardService,
    private readonly postPlateService: PostPlateService,
    private readonly postFoamService: PostFoamService,
    private readonly postVideoService: PostVideoService,
  ) {}

  @Get('/v1/posts')
  async findPostList(@Query() query: FindPostListQuery): Promise<ApiResponse<FindPostListRes>> {
    const foundPost = await this.postService.findPostList(query.toFindPostListData());
    return ApiResponse.successWithData(
      FindPostListRes.of(foundPost.postList, foundPost.totalResults, foundPost.cursor),
    );
  }

  @Get('/v1/posts/:postId')
  async findPost(@Param() { postId }: FindPostParam): Promise<ApiResponse<FindPostRes>> {
    const post = await this.postService.findPost(postId);
    const imageList = await this.postImageService.findPostImageList(post.id);
    const housing = await this.postHousingService.findPostHousing(post.id);
    const switchList = await this.postSwitchService.findPostSwitchList(post.id);
    const keycapList = await this.postKeycapService.findPostKeycapList(post.id);
    const stabilizerList = await this.postStabilizerService.findPostStabilizerList(post.id);
    const keyboardDefinition = await this.postKeyboardDefinitionService.findPostKeyboardDefinition(post.id);
    const printedCircuitBoard = await this.postPrintedCircuitBoardService.findPostPrintedCircuitBoard(post.id);
    const plate = await this.postPlateService.findPostPlate(post.id);
    const foam = await this.postFoamService.findPostFoam(post.id);
    const video = await this.postVideoService.findPostVideo(post.id);

    return ApiResponse.successWithData(
      FindPostRes.of(
        post,
        imageList,
        housing,
        switchList,
        keycapList,
        stabilizerList,
        keyboardDefinition,
        printedCircuitBoard,
        plate,
        foam,
        video,
      ),
    );
  }

  @RoleGuard(['ANY'])
  @Post('/v1/posts')
  async createPost(@AuthUser() authUser: FindUserResult): Promise<ApiResponse<CreatePostRes>> {
    const createdPostId = await this.postService.createPost(authUser.id);
    return ApiResponse.successWithData(CreatePostRes.of(createdPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/title')
  async editPostTitle(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostTitleParam,
    @Body() request: EditPostTitleReq,
  ): Promise<ApiResponse<EditPostTitleRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postService.editPostTitle(postId, request.toEditPostTitle());
    return ApiResponse.successWithData(EditPostTitleRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/images')
  async editPostImageList(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostImageListParam,
    @Body() request: EditPostImageListReq,
  ): Promise<ApiResponse<EditPostImageListRes>> {
    // NOTE: 이거를 decorator로 변경
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postImageService.editPostImageList(postId, request.toEditPostImageList());
    return ApiResponse.successWithData(EditPostImageListRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/housing')
  async editPostHousing(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostHousingParam,
    @Body() request: EditPostHousingReq,
  ): Promise<ApiResponse<EditPostHousingRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postHousingService.editPostHousing(postId, request.toEditPostHousing());
    return ApiResponse.successWithData(EditPostHousingRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/pcb')
  async editPostPrintedCircuitBoard(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostPrintedCircuitBoardParam,
    @Body() request: EditPostPrintedCircuitBoardReq,
  ): Promise<ApiResponse<EditPostPrintedCircuitBoardRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postPrintedCircuitBoardService.editPostPrintedCircuitBoard(
      postId,
      request.toEditPostPrintedCircuitBoard(),
    );
    return ApiResponse.successWithData(EditPostPrintedCircuitBoardRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/plate')
  async editPostPlate(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostPlateParam,
    @Body() request: EditPostPlateReq,
  ): Promise<ApiResponse<EditPostPlateRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postPlateService.editPostPlate(postId, request.toEditPostPlate());
    return ApiResponse.successWithData(EditPostPlateRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Delete('/v1/posts/:postId/plate')
  async deletePostPlate(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: DeletePostPlateParam,
  ): Promise<ApiResponse<DeletePostPlateRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const deleteedPostId = await this.postPlateService.deletePostPlate(postId);
    return ApiResponse.successWithData(DeletePostPlateRes.of(deleteedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/foam')
  async editPostFoam(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostFoamParam,
    @Body() request: EditPostFoamReq,
  ): Promise<ApiResponse<EditPostFoamRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postFoamService.editPostFoam(postId, request.toEditPostFoam());
    return ApiResponse.successWithData(EditPostFoamRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/switches')
  async editPostSwitchList(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostSwitchListParam,
    @Body() request: EditPostSwitchListReq,
  ): Promise<ApiResponse<EditPostSwitchListRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postSwitchService.editPostSwitchList(postId, request.toEditPostSwitchList());
    return ApiResponse.successWithData(EditPostSwitchListRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/keycaps')
  async editPostKeycapList(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostKeycapListParam,
    @Body() request: EditPostKeycapListReq,
  ): Promise<ApiResponse<EditPostKeycapListRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postKeycapService.editPostKeycapList(postId, request.toEditPostKeycapList());
    return ApiResponse.successWithData(EditPostKeycapListRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/stabilizers')
  async editPostStabilizerList(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostStabilizerListParam,
    @Body() request: EditPostStabilizerListReq,
  ): Promise<ApiResponse<EditPostStabilizerListRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postStabilizerService.editPostStabilizerList(
      postId,
      request.toEditPostStabilizerList(),
    );
    return ApiResponse.successWithData(EditPostStabilizerListRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/keyboard-definition')
  async editPostKeyboardDefinition(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostKeyboardDefinitionParam,
    @Body() request: EditPostKeyboardDefinitionReq,
  ): Promise<ApiResponse<EditPostKeyboardDefinitionRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const result = await this.postKeyboardDefinitionService.editPostKeyboardDefinition(
      postId,
      request.toEditPostKeyboardDefinition(),
    );
    return ApiResponse.successWithData(EditPostKeyboardDefinitionRes.of(result));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/switch-on-layout')
  async editPostSwitchOnLayout(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostSwitchOnLayoutParam,
    @Body() request: EditPostSwitchOnLayoutReq,
  ): Promise<ApiResponse<EditPostSwitchOnLayoutRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postKeyboardDefinitionService.editPostSwitchOnLayout(
      postId,
      request.switchId,
      request.toEditPostSwitchOnLayoutData(),
    );
    return ApiResponse.successWithData(EditPostSwitchOnLayoutRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/keycap-on-layout')
  async editPostKeycapOnLayout(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostKeycapOnLayoutParam,
    @Body() request: EditPostKeycapOnLayoutReq,
  ): Promise<ApiResponse<EditPostKeycapOnLayoutRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postKeyboardDefinitionService.editPostKeycapOnLayout(
      postId,
      request.keycapId,
      request.toEditPostKeycapOnLayoutData(),
    );
    return ApiResponse.successWithData(EditPostKeycapOnLayoutRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/video')
  async editPostVideo(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostVideoParam,
    @Body() request: EditPostVideoReq,
  ): Promise<ApiResponse<EditPostVideoRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postVideoService.editPostVideo(postId, request.toEditPostVideo());
    return ApiResponse.successWithData(EditPostVideoRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Delete('/v1/posts/:postId/video')
  async deletePostVideo(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: DeletePostVideoParam,
  ): Promise<ApiResponse<DeletePostVideoRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const deleteedPostId = await this.postVideoService.deletePostVideo(postId);
    return ApiResponse.successWithData(DeletePostVideoRes.of(deleteedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/content')
  async editPostContent(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostContentParam,
    @Body() request: EditPostContentReq,
  ): Promise<ApiResponse<EditPostContentRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postService.editPostContent(postId, request.toEditPostContent());
    return ApiResponse.successWithData(EditPostContentRes.of(editedPostId));
  }

  @RoleGuard(['ANY'])
  @Patch('/v1/posts/:postId/setting')
  async editPostSetting(
    @AuthUser() authUser: FindUserResult,
    @Param() { postId }: EditPostSettingParam,
    @Body() request: EditPostSettingReq,
  ): Promise<ApiResponse<EditPostSettingRes>> {
    await this.postService.validateMyPostIfNotAdmin(TargetPostWithUserData.toTargetPostWithUser(postId, authUser));

    const editedPostId = await this.postService.editPostSetting(postId, request.toEditPostSetting());
    return ApiResponse.successWithData(EditPostSettingRes.of(editedPostId));
  }
}
