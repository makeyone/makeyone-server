export class EditPostKeycapOnLayoutRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostKeycapOnLayoutRes {
    return new EditPostKeycapOnLayoutRes(editedPostId);
  }
}
