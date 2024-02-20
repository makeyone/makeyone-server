import { IsNumber } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';
import { PostHousingEntity } from '@src/libs/entity/domain/post/PostHousing.entity';
import { PostImageEntity } from '@src/libs/entity/domain/post/PostImage.entity';
import { PostKeycapEntity } from '@src/libs/entity/domain/post/PostKeycap.entity';
import { PostSwitchEntity } from '@src/libs/entity/domain/post/PostSwitch.entity';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

export class GetPostByIdParam {
  @IsNumber()
  postId: number;
}

type Post = Pick<PostEntity, 'id' | 'createdAt' | 'postTitle'>;
type User = Pick<UserEntity, 'id' | 'nickname' | 'profileImg'>;
type PostImage = Pick<PostImageEntity, 'id' | 'imageUrl'>;
type PostHousing = Pick<
  PostHousingEntity,
  | 'id'
  | 'housingName'
  | 'housingColor'
  | 'housingMount'
  | 'housingLayout'
  | 'housingWindowKeyLayout'
  | 'housingFunctionKeyLayout'
  | 'isHousingReAnodized'
>;
type PostSwitch = Pick<
  PostSwitchEntity,
  | 'id'
  | 'switchName'
  | 'switchType'
  | 'isSlientSwitch'
  | 'switchLube'
  | 'bottomOutForce'
  | 'springLength'
  | 'switchFilm'
  | 'remark'
>;
type PostKeycap = Pick<PostKeycapEntity, 'id' | 'keycapName' | 'keycapProfile' | 'keycapTexture' | 'manufacturer' | 'remark'>;

export type GetPostById = Post & {
  postedUser: User;
  postImages: PostImage[];
  postHousing: PostHousing | null;
  postSwitches: PostSwitch[];
  postKeycaps: PostKeycap[];
};

export class GetPostByIdOutput extends CoreOutput {
  post?: GetPostById;
}
