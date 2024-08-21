export class EditPostVideoRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostVideoRes {
    return new EditPostVideoRes(editedPostId);
  }
}
