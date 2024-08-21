export class EditPostPlateRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostPlateRes {
    return new EditPostPlateRes(editedPostId);
  }
}
