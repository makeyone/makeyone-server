export class EditPostImageListRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostImageListRes {
    return new EditPostImageListRes(editedPostId);
  }
}
