import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';

export class EditPostKeyboardDefinitionData {
  constructor(readonly keyboardDefinition: VIADefinitionV2 | VIADefinitionV3, readonly layoutOptionKeys?: number[]) {}
}
