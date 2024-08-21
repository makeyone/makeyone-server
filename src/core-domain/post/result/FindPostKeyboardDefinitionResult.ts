import { PostKeyboardDefinitionType } from '@src/database/entity/Post/type/PostKeyboardLayout.type';

export class FindPostKeyboardDefinitionResult {
  id: number;
  definitionName: string;
  keyboardDefinition: PostKeyboardDefinitionType;
  layoutOptionKeys: number[];
}
