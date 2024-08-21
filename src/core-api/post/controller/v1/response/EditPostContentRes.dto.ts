export class EditPostContentRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostContentRes {
    return new EditPostContentRes(editedPostId);
  }
}
