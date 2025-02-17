export class EditPostSettingRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostSettingRes {
    return new EditPostSettingRes(editedPostId);
  }
}
