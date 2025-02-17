import { PostKeyboardDefinitionType } from '@src/database/entity/Post/type/PostKeyboardLayout.type';

export class FindPostKeyboardDefinitionResult {
  constructor(
    readonly id: number,
    readonly definitionName: string,
    readonly keyboardDefinition: PostKeyboardDefinitionType,
    readonly layoutOptionKeys: number[],
  ) {}
}
