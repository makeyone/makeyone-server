export class DeletePostVideoRes {
  constructor(readonly deletedPostId: number) {}

  static of(deletedPostId: number): DeletePostVideoRes {
    return new DeletePostVideoRes(deletedPostId);
  }
}
