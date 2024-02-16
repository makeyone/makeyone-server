import { IsNumber } from 'class-validator';

import { CoreOutput } from '@src/libs/entity/domain/common/Core.dto';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';

export class GetPostByIdParam {
  @IsNumber()
  postId: number;
}

export class GetPostByIdOutput extends CoreOutput {
  post?: Pick<PostEntity, 'id'>;
}
