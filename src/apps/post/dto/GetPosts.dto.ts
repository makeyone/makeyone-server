import { CursorPaginationOutput, CursorPaginationQuery } from '@src/libs/entity/domain/common/Pagination.dto';
import { PostEntity } from '@src/libs/entity/domain/post/Post.entity';
import { PostImageEntity } from '@src/libs/entity/domain/post/PostImage.entity';
import { UserEntity } from '@src/libs/entity/domain/user/User.entity';

export class GetPostsQuery extends CursorPaginationQuery {}

type Post = Pick<PostEntity, 'id' | 'createdAt' | 'postTitle'>;
type User = Pick<UserEntity, 'id' | 'nickname' | 'profileImg'>;
type PostImage = Pick<PostImageEntity, 'id' | 'imageUrl'>;

export class GetPostsOutput extends CursorPaginationOutput {
  posts?: (Post & {
    postedUser: User;
    postImages: PostImage[];
  })[];
}
