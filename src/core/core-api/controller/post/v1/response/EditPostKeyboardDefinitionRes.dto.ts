import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';

import { EditPostKeyboardDefinitionResult } from '@src/core/core-domain/domain/post/result/EditPostKeyboardDefinitionResult';

export class EditPostKeyboardDefinitionRes {
  constructor(
    readonly editedPostId: number,
    readonly editedKeyboardDefinition: {
      definitionName: string;
      keyboardDefinition: VIADefinitionV2 | VIADefinitionV3;
      layoutOptionKeys: number[];
    },
  ) {}

  static of({
    editedPostId,
    definitionName,
    keyboardDefinition,
    layoutOptionKeys,
  }: EditPostKeyboardDefinitionResult): EditPostKeyboardDefinitionRes {
    return new EditPostKeyboardDefinitionRes(editedPostId, { definitionName, keyboardDefinition, layoutOptionKeys });
  }
}
