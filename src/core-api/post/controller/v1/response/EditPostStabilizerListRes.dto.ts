export class EditPostStabilizerListRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostStabilizerListRes {
    return new EditPostStabilizerListRes(editedPostId);
  }
}
