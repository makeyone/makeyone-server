import { KeyboardSwitchLubeUnion } from '@src/core/core-enum/Post/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion } from '@src/core/core-enum/Post/KeyboardSwitchType.enum';

export class EditPostSwitchData {
  constructor(
    readonly switchId: number,
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
