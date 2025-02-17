export class EditPostPrintedCircuitBoardRes {
  constructor(readonly editedPostId: number) {}

  static of(editedPostId: number): EditPostPrintedCircuitBoardRes {
    return new EditPostPrintedCircuitBoardRes(editedPostId);
  }
}
