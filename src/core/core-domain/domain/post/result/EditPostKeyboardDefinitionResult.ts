import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';

export class EditPostKeyboardDefinitionResult {
  constructor(
    readonly editedPostId: number,
    readonly definitionName: string,
    readonly keyboardDefinition: VIADefinitionV2 | VIADefinitionV3,
    readonly layoutOptionKeys: number[],
  ) {}
}
