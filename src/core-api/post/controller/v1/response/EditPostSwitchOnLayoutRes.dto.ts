export class EditPostSwitchOnLayoutRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostSwitchOnLayoutRes {
    return new EditPostSwitchOnLayoutRes(editedPostId);
  }
}
