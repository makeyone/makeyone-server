export class EditPostFoamRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostFoamRes {
    return new EditPostFoamRes(editedPostId);
  }
}
