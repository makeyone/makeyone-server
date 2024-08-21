import { KeyboardSwitchLubeUnion } from '@src/core-enum/Post/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion } from '@src/core-enum/Post/KeyboardSwitchType.enum';

export class CreatePostSwitchData {
  constructor(
    readonly switchName: string,
    readonly switchType: KeyboardSwitchTypeUnion,
    readonly isSlientSwitch: boolean,
    readonly switchLube: KeyboardSwitchLubeUnion,
    readonly bottomOutForce?: number,
    readonly springLength?: number,
    readonly switchFilm?: string,
    readonly remark?: string,
  ) {}
}
