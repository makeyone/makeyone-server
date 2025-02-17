export class EditPostKeycapListRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostKeycapListRes {
    return new EditPostKeycapListRes(editedPostId);
  }
}
