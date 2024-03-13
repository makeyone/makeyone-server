import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';
import { PostFoamEntity } from '@src/libs/entity/domain/post/PostFoam.entity';
import { PostHousingEntity } from '@src/libs/entity/domain/post/PostHousing.entity';
import { PostImageEntity } from '@src/libs/entity/domain/post/PostImage.entity';
import { PostKeyboardDefinitionEntity } from '@src/libs/entity/domain/post/PostKeyboardDefinition.entity';
import { PostKeycapEntity } from '@src/libs/entity/domain/post/PostKeycap.entity';
import { PostPCBEntity } from '@src/libs/entity/domain/post/PostPCB.entity';
import { PostPlateEntity } from '@src/libs/entity/domain/post/PostPlate.entity';
import { PostStabilizerEntity } from '@src/libs/entity/domain/post/PostStabilizer.entity';
import { PostSwitchEntity } from '@src/libs/entity/domain/post/PostSwitch.entity';
import { PostKeyboardDefinitionType, PostKeyboardLayoutKey } from '@src/libs/entity/domain/post/types/PostKeyboardLayout.type';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

import { CreatePostOutput } from '@src/apps/post/dto/CreatePost.dto';
import { DeletePostPlateOutput, DeletePostPlateParam } from '@src/apps/post/dto/DeletePostPlate.dto';
import { EditPostFoamInput, EditPostFoamParam } from '@src/apps/post/dto/EditPostFoam.dto';
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
import { GetPostByIdOutput, GetPostByIdParam } from '@src/apps/post/dto/GetPostById.dto';
import { PostFoamQueryRepository } from '@src/apps/post/PostFoamQueryRepository';
import { PostHousingQueryRepository } from '@src/apps/post/PostHousingQueryRepository';
import { PostKeyboardDefinitionQueryRepository } from '@src/apps/post/PostKeyboardDefinitionQueryRepository';
import { PostKeycapQueryRepository } from '@src/apps/post/PostKeycapQueryRepository';
import { PostPCBQueryRepository } from '@src/apps/post/PostPCBQueryRepository';
import { PostPlateQueryRepository } from '@src/apps/post/PostPlateQueryRepository';
import { PostQueryRepository } from '@src/apps/post/PostQueryRepository';
import { PostStabilizerQueryRepository } from '@src/apps/post/PostStabilizerQueryRepository';
import { PostSwitchQueryRepository } from '@src/apps/post/PostSwitchQueryRepository';

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
    @InjectRepository(PostSwitchEntity)
    private readonly postSwitchRepository: Repository<PostSwitchEntity>,
    private readonly postSwitchQueryRepository: PostSwitchQueryRepository,
    @InjectRepository(PostKeycapEntity)
    private readonly postKeycapRepository: Repository<PostKeycapEntity>,
    private readonly postKeycapQueryRepository: PostKeycapQueryRepository,
    @InjectRepository(PostStabilizerEntity)
    private readonly postStabilizerRepository: Repository<PostStabilizerEntity>,
    private readonly postStabilizerQueryRepository: PostStabilizerQueryRepository,
    @InjectRepository(PostKeyboardDefinitionEntity)
    private readonly postKeyboardDefinitionRepository: Repository<PostKeyboardDefinitionEntity>,
    private readonly postKeyboardDefinitionQueryRepository: PostKeyboardDefinitionQueryRepository,
    @InjectRepository(PostPCBEntity)
    private readonly postPCBRepository: Repository<PostPCBEntity>,
    private readonly postPCBQueryRepository: PostPCBQueryRepository,
    @InjectRepository(PostPlateEntity)
    private readonly postPlateRepository: Repository<PostPlateEntity>,
    private readonly postPlateQueryRepository: PostPlateQueryRepository,
    @InjectRepository(PostFoamEntity)
    private readonly postFoamRepository: Repository<PostFoamEntity>,
    private readonly postFoamQueryRepository: PostFoamQueryRepository,
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

  async editPostSwitch(
    me: UserEntity,
    { postId }: EditPostSwitchParam,
    { switches }: EditPostSwitchInput,
  ): Promise<EditPostSwitchOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    await this.dataSource.transaction(async (manager) => {
      const postSwitchRepository = manager.withRepository(this.postSwitchRepository);
      const postSwitchQueryRepository = manager.withRepository(this.postSwitchQueryRepository);

      // 기존에 등록된 스위치를 가져오고 switchId 기준으로 매핑
      const existingSwitches = await postSwitchQueryRepository.findPostSwitchesByPostId(postId);
      const existingSwitchesMap = new Map(existingSwitches.map((keyboardSwitch) => [keyboardSwitch.id, keyboardSwitch]));

      // 수정된 스위치 목록에서 기존 스위치가 제거되었으면 삭제
      for (const existingSwitch of existingSwitches) {
        const switchExists = switches.some((keyboardSwitch) => keyboardSwitch.switchId === existingSwitch.id);
        if (!switchExists) {
          await postSwitchRepository.delete(existingSwitch.id);
          existingSwitchesMap.delete(existingSwitch.id);
        }
      }

      for (const keyboardSwitch of switches) {
        // 기존의 스위치가 아직 있으면 update
        if (existingSwitchesMap.has(keyboardSwitch.switchId) === true) {
          await postSwitchRepository.update(keyboardSwitch.switchId, {
            switchName: keyboardSwitch.switchName,
            switchType: keyboardSwitch.switchType,
            isSlientSwitch: keyboardSwitch.isSlientSwitch,
            switchLube: keyboardSwitch.switchLube,
            bottomOutForce: keyboardSwitch.bottomOutForce || null,
            springLength: keyboardSwitch.springLength || null,
            switchFilm: keyboardSwitch.switchFilm || null,
            remark: keyboardSwitch.remark || null,
          });
        }

        // 기존의 스위치가 없으면 insert
        if (existingSwitchesMap.has(keyboardSwitch.switchId) === false) {
          await postSwitchRepository.save(
            postSwitchRepository.create({
              switchName: keyboardSwitch.switchName,
              switchType: keyboardSwitch.switchType,
              isSlientSwitch: keyboardSwitch.isSlientSwitch,
              switchLube: keyboardSwitch.switchLube,
              ...(keyboardSwitch.bottomOutForce && { bottomOutForce: keyboardSwitch.bottomOutForce }),
              ...(keyboardSwitch.springLength && { springLength: keyboardSwitch.springLength }),
              ...(keyboardSwitch.switchFilm && { switchFilm: keyboardSwitch.switchFilm }),
              ...(keyboardSwitch.remark && { remark: keyboardSwitch.remark }),
              post,
            }),
          );
        }
      }
    });

    return {
      ok: true,
      editedPostId: postId,
    };
  }

  async editPostKeycap(
    me: UserEntity,
    { postId }: EditPostKeycapParam,
    { keycaps }: EditPostKeycapInput,
  ): Promise<EditPostKeycapOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    await this.dataSource.transaction(async (manager) => {
      const postKeycapRepository = manager.withRepository(this.postKeycapRepository);
      const postKeycapQueryRepository = manager.withRepository(this.postKeycapQueryRepository);

      const existingKeycaps = await postKeycapQueryRepository.findPostKeycapsByPostId(postId);
      const existingKeycapsMap = new Map(existingKeycaps.map((keycap) => [keycap.id, keycap]));

      for (const existingKeycap of existingKeycaps) {
        const keycapExists = keycaps.some((keycap) => keycap.keycapId === existingKeycap.id);
        if (!keycapExists) {
          await postKeycapRepository.delete(existingKeycap.id);
          existingKeycapsMap.delete(existingKeycap.id);
        }
      }

      for (const keycap of keycaps) {
        if (existingKeycapsMap.has(keycap.keycapId) === true) {
          await postKeycapRepository.update(keycap.keycapId, {
            keycapName: keycap.keycapName,
            keycapProfile: keycap.keycapProfile,
            keycapTexture: keycap.keycapTexture,
            manufacturer: keycap.manufacturer || null,
            remark: keycap.remark || null,
          });
        }

        if (existingKeycapsMap.has(keycap.keycapId) === false) {
          await postKeycapRepository.save(
            postKeycapRepository.create({
              keycapName: keycap.keycapName,
              keycapProfile: keycap.keycapProfile,
              keycapTexture: keycap.keycapTexture,
              ...(keycap.manufacturer && { manufacturer: keycap.manufacturer }),
              ...(keycap.remark && { remark: keycap.remark }),
              post,
            }),
          );
        }
      }
    });

    return {
      ok: true,
      editedPostId: postId,
    };
  }

  async editPostStabilizer(
    me: UserEntity,
    { postId }: EditPostStabilizerParam,
    { stabilizers }: EditPostStabilizerInput,
  ): Promise<EditPostStabilizerOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    await this.dataSource.transaction(async (manager) => {
      const postStabilizerRepository = manager.withRepository(this.postStabilizerRepository);
      const postStabilizerQueryRepository = manager.withRepository(this.postStabilizerQueryRepository);

      const existingStabilizers = await postStabilizerQueryRepository.findPostStabilizersByPostId(postId);
      const existingStabilizersMap = new Map(existingStabilizers.map((stabilizer) => [stabilizer.id, stabilizer]));

      for (const existingStabilizer of existingStabilizers) {
        const stabilizerExists = stabilizers.some((stabilizer) => stabilizer.stabilizerId === existingStabilizer.id);
        if (!stabilizerExists) {
          await postStabilizerRepository.delete(existingStabilizer.id);
          existingStabilizersMap.delete(existingStabilizer.id);
        }
      }

      for (const stabilizer of stabilizers) {
        if (existingStabilizersMap.has(stabilizer.stabilizerId) === true) {
          await postStabilizerRepository.update(stabilizer.stabilizerId, {
            stabilizerName: stabilizer.stabilizerName,
            stabilizerType: stabilizer.stabilizerType,
            stabilizerMount: stabilizer.stabilizerMount,
            remark: stabilizer.remark || null,
          });
        }

        if (existingStabilizersMap.has(stabilizer.stabilizerId) === false) {
          await postStabilizerRepository.save(
            postStabilizerRepository.create({
              stabilizerName: stabilizer.stabilizerName,
              stabilizerType: stabilizer.stabilizerType,
              stabilizerMount: stabilizer.stabilizerMount,
              ...(stabilizer.remark && { remark: stabilizer.remark }),
              post,
            }),
          );
        }
      }
    });

    return {
      ok: true,
      editedPostId: postId,
    };
  }

  async editPostKeyboardDefinition(
    me: UserEntity,
    { postId }: EditPostKeyboardDefinitionParam,
    { keyboardDefinition, layoutOptionKeys }: EditPostKeyboardDefinitionInput,
  ): Promise<EditPostKeyboardDefinitionOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    const denifition = await this.postKeyboardDefinitionQueryRepository.findPostKeyboardDefinitionByPostId(postId);
    const editedKeyboardDefinition = await this.postKeyboardDefinitionRepository.save({
      ...(denifition && { id: denifition.id }),
      definitionName: keyboardDefinition.name,
      keyboardDefinition,
      layoutOptionKeys: layoutOptionKeys ? layoutOptionKeys.map((layoutOption) => layoutOption || 0) : [],
      post: {
        id: postId,
      },
    });

    return {
      ok: true,
      editedPostId: postId,
      editedKeyboardLayout: {
        id: editedKeyboardDefinition.id,
        definitionName: editedKeyboardDefinition.definitionName,
        layoutOptionKeys: editedKeyboardDefinition.layoutOptionKeys,
        keyboardDefinition: editedKeyboardDefinition.keyboardDefinition,
      },
    };
  }

  async editPostSwitchOnLayout(
    me: UserEntity,
    { postId }: EditPostSwitchOnLayoutParam,
    { switchId, keys: wantToRegisterKeys }: EditPostSwitchOnLayoutInput,
  ): Promise<EditPostSwitchOnLayoutOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    const keyboardSwitch = await this.postSwitchQueryRepository.findPostSwitchById(switchId);
    if (!keyboardSwitch) {
      throw new NotFoundException('SWITCH_NOT_FOUND');
    }

    const definition = await this.postKeyboardDefinitionQueryRepository.findPostKeyboardDefinitionByPostId(postId);
    const copyDefinition: PostKeyboardDefinitionEntity = { ...definition };

    const editDefinition: PostKeyboardDefinitionType = { ...definition.keyboardDefinition };

    // 일반 키에 스위치를 등록한다.
    const layoutKeys = copyDefinition.keyboardDefinition.layouts.keys;
    for (const wantToRegisterKey of wantToRegisterKeys) {
      const findKey: PostKeyboardLayoutKey = layoutKeys.find(
        (layoutKey) => layoutKey.row === wantToRegisterKey.row && layoutKey.col === wantToRegisterKey.col,
      );
      if (findKey) {
        findKey.registeredSwitch = {
          id: keyboardSwitch.id,
          switchName: keyboardSwitch.switchName,
        };
      }
    }
    editDefinition.layouts.keys = layoutKeys;

    // 옵션 키에 스위치를 등록한다
    const optionKeys = copyDefinition.layoutOptionKeys;
    const layoutOptionKeys = copyDefinition.keyboardDefinition.layouts.optionKeys;
    Object.entries(layoutOptionKeys).flatMap(([key, options]) => {
      const index = parseInt(key, 10);
      const keys = optionKeys[index] ? options[optionKeys[index]] : options[0];
      for (const wantToRegisterKey of wantToRegisterKeys) {
        const findOptionKey: PostKeyboardLayoutKey = keys.find(
          (key) => key.col === wantToRegisterKey.col && key.row === wantToRegisterKey.row,
        );
        if (findOptionKey) {
          findOptionKey.registeredSwitch = {
            id: keyboardSwitch.id,
            switchName: keyboardSwitch.switchName,
          };
        }
      }
    });
    editDefinition.layouts.optionKeys = layoutOptionKeys;

    await this.postKeyboardDefinitionRepository.save({
      id: definition.id,
      keyboardDefinition: editDefinition,
    });

    return {
      ok: true,
      editedPostId: postId,
    };
  }

  async editPostKeycapOnLayout(
    me: UserEntity,
    { postId }: EditPostKeycapOnLayoutParam,
    { keycapId, keys: wantToRegisterKeys }: EditPostKeycapOnLayoutInput,
  ): Promise<EditPostKeycapOnLayoutOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    const keyboardKeycap = await this.postKeycapQueryRepository.findPostKeycapById(keycapId);
    if (!keyboardKeycap) {
      throw new NotFoundException('KEYCAP_NOT_FOUND');
    }

    const definition = await this.postKeyboardDefinitionQueryRepository.findPostKeyboardDefinitionByPostId(postId);
    const copyDefinition: PostKeyboardDefinitionEntity = { ...definition };

    const editDefinition: PostKeyboardDefinitionType = { ...definition.keyboardDefinition };

    // 일반 키에 키캡을 등록한다.
    const layoutKeys = copyDefinition.keyboardDefinition.layouts.keys;
    for (const wantToRegisterKey of wantToRegisterKeys) {
      const findKey: PostKeyboardLayoutKey = layoutKeys.find(
        (layoutKey) => layoutKey.row === wantToRegisterKey.row && layoutKey.col === wantToRegisterKey.col,
      );
      if (findKey) {
        findKey.registeredKeycap = {
          id: keyboardKeycap.id,
          keycapName: keyboardKeycap.keycapName,
        };
      }
    }
    editDefinition.layouts.keys = layoutKeys;

    // 옵션 키에 키캡을 등록한다
    const optionKeys = copyDefinition.layoutOptionKeys;
    const layoutOptionKeys = copyDefinition.keyboardDefinition.layouts.optionKeys;
    Object.entries(layoutOptionKeys).flatMap(([key, options]) => {
      const index = parseInt(key, 10);
      const keys = optionKeys[index] ? options[optionKeys[index]] : options[0];
      for (const wantToRegisterKey of wantToRegisterKeys) {
        const findOptionKey: PostKeyboardLayoutKey = keys.find(
          (key) => key.col === wantToRegisterKey.col && key.row === wantToRegisterKey.row,
        );
        if (findOptionKey) {
          findOptionKey.registeredKeycap = {
            id: keyboardKeycap.id,
            keycapName: keyboardKeycap.keycapName,
          };
        }
      }
    });
    editDefinition.layouts.optionKeys = layoutOptionKeys;

    await this.postKeyboardDefinitionRepository.save({
      id: definition.id,
      keyboardDefinition: editDefinition,
    });

    return {
      ok: true,
      editedPostId: postId,
    };
  }

  async editPostPCB(
    me: UserEntity,
    { postId }: EditPostPCBParam,
    { pcbName, pcbThickness, pcbType, isRgbPcb, isFlexCutPcb, remark }: EditPostPCBInput,
  ): Promise<EditPostPCBOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    const postPCB = await this.postPCBQueryRepository.findPostPCBByPostId(postId);
    await this.postPCBRepository.save({
      ...(postPCB && { id: postPCB.id }),
      pcbName,
      pcbType,
      isRgbPcb,
      isFlexCutPcb,
      pcbThickness: pcbThickness || null,
      remark: remark || null,
      post: {
        id: postId,
      },
    });

    return {
      ok: true,
      editedPostId: postId,
    };
  }

  async editPostPlate(
    me: UserEntity,
    { postId }: EditPostPlateParam,
    { plateName, plateTexture, isFlexCutPlate, isHalfPlate, remark }: EditPostPlateInput,
  ): Promise<EditPostPlateOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    const postPlate = await this.postPlateQueryRepository.findPostPlateByPostId(postId);
    await this.postPlateRepository.save({
      ...(postPlate && { id: postPlate.id }),
      plateName,
      plateTexture,
      isFlexCutPlate,
      isHalfPlate,
      remark: remark || null,
      post: {
        id: postId,
      },
    });

    return {
      ok: true,
      editedPostId: postId,
    };
  }

  async deletePostPlate(me: UserEntity, { postId }: DeletePostPlateParam): Promise<DeletePostPlateOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    const postPlate = await this.postPlateQueryRepository.findPostPlateByPostId(postId);
    if (postPlate) {
      await this.postPlateRepository.delete(postPlate.id);
    }

    return {
      ok: true,
      deletedPostId: postId,
    };
  }

  async editPostFoam(
    me: UserEntity,
    { postId }: EditPostFoamParam,
    { plateBetweenPCBFoam, bottomSwitchPEFoam, bottomFoam, tapeMod, remark }: EditPostFoamInput,
  ): Promise<EditPostPlateOutput> {
    const post = await this.postQueryRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('POST_NOT_FOUND');
    }
    if (post.postedUser.id !== me.id && me.role === 'CLIENT') {
      throw new UnauthorizedException('UNAUTHORIZED_POST');
    }

    const postFoam = await this.postFoamQueryRepository.findPostFoamByPostId(postId);
    await this.postFoamRepository.save({
      ...(postFoam && { id: postFoam.id }),
      plateBetweenPCBFoam,
      bottomSwitchPEFoam,
      bottomFoam,
      tapeMod,
      remark: remark || null,
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
