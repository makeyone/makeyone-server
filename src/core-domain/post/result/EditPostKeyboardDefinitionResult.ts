import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';

export class EditPostKeyboardDefinitionResult {
  editedPostId: number;
  definitionName: string;
  keyboardDefinition: VIADefinitionV2 | VIADefinitionV3;
  layoutOptionKeys: number[];
}
