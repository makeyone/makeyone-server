import { Module } from '@nestjs/common';

import { PostController } from '@src/core/core-api/controller/post/v1/Post.controller';

import { PostCreator } from '@src/core/core-domain/domain/post/Post.creator';
import { PostEditor } from '@src/core/core-domain/domain/post/Post.editor';
import { PostReader } from '@src/core/core-domain/domain/post/Post.reader';
import { PostRemover } from '@src/core/core-domain/domain/post/Post.remover';
import { PostService } from '@src/core/core-domain/domain/post/Post.service';
import { PostFoamEditor } from '@src/core/core-domain/domain/post/PostFoam.editor';
import { PostFoamReader } from '@src/core/core-domain/domain/post/PostFoam.reader';
import { PostFoamService } from '@src/core/core-domain/domain/post/PostFoam.service';
import { PostHousingReader } from '@src/core/core-domain/domain/post/PostHousing.reader';
import { PostHousingService } from '@src/core/core-domain/domain/post/PostHousing.service';
import { PostHousingEditor } from '@src/core/core-domain/domain/post/PostIHousing.editor';
import { PostImageEditor } from '@src/core/core-domain/domain/post/PostImage.editor';
import { PostImageReader } from '@src/core/core-domain/domain/post/PostImage.reader';
import { PostImageService } from '@src/core/core-domain/domain/post/PostImage.service';
import { PostKeyboardDefinitionEditor } from '@src/core/core-domain/domain/post/PostKeyboardDefinition.editor';
import { PostKeyboardDefinitionReader } from '@src/core/core-domain/domain/post/PostKeyboardDefinition.reader';
import { PostKeyboardDefinitionService } from '@src/core/core-domain/domain/post/PostKeyboardDefinition.service';
import { PostKeycapCreator } from '@src/core/core-domain/domain/post/PostKeycap.creator';
import { PostKeycapEditor } from '@src/core/core-domain/domain/post/PostKeycap.editor';
import { PostKeycapReader } from '@src/core/core-domain/domain/post/PostKeycap.reader';
import { PostKeycapRemover } from '@src/core/core-domain/domain/post/PostKeycap.remover';
import { PostKeycapService } from '@src/core/core-domain/domain/post/PostKeycap.service';
import { PostPlateEditor } from '@src/core/core-domain/domain/post/PostPlate.editor';
import { PostPlateReader } from '@src/core/core-domain/domain/post/PostPlate.reader';
import { PostPlateRemover } from '@src/core/core-domain/domain/post/PostPlate.remover';
import { PostPlateService } from '@src/core/core-domain/domain/post/PostPlate.service';
import { PostPrintedCircuitBoardEditor } from '@src/core/core-domain/domain/post/PostPrintedCircuitBoard.editor';
import { PostPrintedCircuitBoardReader } from '@src/core/core-domain/domain/post/PostPrintedCircuitBoard.reader';
import { PostPrintedCircuitBoardService } from '@src/core/core-domain/domain/post/PostPrintedCircuitBoard.service';
import { PostStabilizerCreator } from '@src/core/core-domain/domain/post/PostStabilizer.creator';
import { PostStabilizerEditor } from '@src/core/core-domain/domain/post/PostStabilizer.editor';
import { PostStabilizerReader } from '@src/core/core-domain/domain/post/PostStabilizer.reader';
import { PostStabilizerRemover } from '@src/core/core-domain/domain/post/PostStabilizer.remover';
import { PostStabilizerService } from '@src/core/core-domain/domain/post/PostStabilizer.service';
import { PostSwitchCreator } from '@src/core/core-domain/domain/post/PostSwitch.creator';
import { PostSwitchEditor } from '@src/core/core-domain/domain/post/PostSwitch.editor';
import { PostSwitchReader } from '@src/core/core-domain/domain/post/PostSwitch.reader';
import { PostSwitchRemover } from '@src/core/core-domain/domain/post/PostSwitch.remover';
import { PostSwitchService } from '@src/core/core-domain/domain/post/PostSwitch.service';
import { PostVideoEditor } from '@src/core/core-domain/domain/post/PostVideo.editor';
import { PostVideoReader } from '@src/core/core-domain/domain/post/PostVideo.reader';
import { PostVideoRemover } from '@src/core/core-domain/domain/post/PostVideo.remover';
import { PostVideoService } from '@src/core/core-domain/domain/post/PostVideo.service';

import { PostRepository } from '@src/database/entity/Post/Post.repository';
import { PostFoamRepository } from '@src/database/entity/Post/PostFoam.repository';
import { PostHousingRepository } from '@src/database/entity/Post/PostHousing.repository';
import { PostImageRepository } from '@src/database/entity/Post/PostImage.repository';
import { PostKeyboardDefinitionRepository } from '@src/database/entity/Post/PostKeyboardDefinition.repository';
import { PostKeycapRepository } from '@src/database/entity/Post/PostKeycap.repository';
import { PostPlateRepository } from '@src/database/entity/Post/PostPlate.repository';
import { PostPrintedCircuitBoardRepository } from '@src/database/entity/Post/PostPrintedCircuitBoard.repository';
import { PostStabilizerRepository } from '@src/database/entity/Post/PostStabilizer.repository';
import { PostSwitchRepository } from '@src/database/entity/Post/PostSwitch.repository';
import { PostVideoRepository } from '@src/database/entity/Post/PostVideo.repository';
import { UserRepository } from '@src/database/entity/User/User.repository';
import { TypeormEntityModule } from '@src/database/TypeormEntity.module';

@Module({
  imports: [
    TypeormEntityModule.forCustomRepository([
      PostRepository,
      PostImageRepository,
      PostHousingRepository,
      PostSwitchRepository,
      PostKeycapRepository,
      PostStabilizerRepository,
      PostKeyboardDefinitionRepository,
      PostPrintedCircuitBoardRepository,
      PostPlateRepository,
      PostFoamRepository,
      PostVideoRepository,
      UserRepository,
    ]),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostImageService,
    PostHousingService,
    PostSwitchService,
    PostKeycapService,
    PostStabilizerService,
    PostKeyboardDefinitionService,
    PostPrintedCircuitBoardService,
    PostPlateService,
    PostFoamService,
    PostVideoService,
    PostReader,
    PostImageReader,
    PostHousingReader,
    PostSwitchReader,
    PostKeycapReader,
    PostStabilizerReader,
    PostKeyboardDefinitionReader,
    PostPrintedCircuitBoardReader,
    PostPlateReader,
    PostFoamReader,
    PostVideoReader,
    PostCreator,
    PostSwitchCreator,
    PostKeycapCreator,
    PostStabilizerCreator,
    PostEditor,
    PostSwitchEditor,
    PostFoamEditor,
    PostImageEditor,
    PostHousingEditor,
    PostPrintedCircuitBoardEditor,
    PostPlateEditor,
    PostFoamEditor,
    PostKeycapEditor,
    PostStabilizerEditor,
    PostKeyboardDefinitionEditor,
    PostVideoEditor,
    PostRemover,
    PostSwitchRemover,
    PostKeycapRemover,
    PostStabilizerRemover,
    PostPlateRemover,
    PostVideoRemover,
  ],
})
export class PostModule {}
