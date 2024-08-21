export class CreatePostRes {
  constructor(readonly createdPostId: number) {}

  static of(createdPostId: number): CreatePostRes {
    return new CreatePostRes(createdPostId);
  }
}
