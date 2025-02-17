export class EditPostHousingRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostHousingRes {
    return new EditPostHousingRes(editedPostId);
  }
}
