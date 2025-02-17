export class EditPostTitleRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostTitleRes {
    return new EditPostTitleRes(editedPostId);
  }
}
