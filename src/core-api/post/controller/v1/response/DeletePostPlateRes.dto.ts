export class DeletePostPlateRes {
  constructor(readonly deletedPostId: number) {}

  static of(deletedPostId: number): DeletePostPlateRes {
    return new DeletePostPlateRes(deletedPostId);
  }
}
