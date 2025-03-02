export class DeletePostRes {
  constructor(readonly deletedPostId: number) {}

  static of(deletedPostId: number): DeletePostRes {
    return new DeletePostRes(deletedPostId);
  }
}
