export class EditPostSwitchListRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostSwitchListRes {
    return new EditPostSwitchListRes(editedPostId);
  }
}
