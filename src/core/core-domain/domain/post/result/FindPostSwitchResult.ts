import { KeyboardSwitchLubeUnion } from '@src/core/core-enum/Post/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion } from '@src/core/core-enum/Post/KeyboardSwitchType.enum';

export class FindPostSwitchResult {
  constructor(
    readonly id: number,
    readonly switchName: string,
    readonly switchType: KeyboardSwitchTypeUnion,
    readonly isSlientSwitch: boolean,
    readonly switchLube: KeyboardSwitchLubeUnion,
    readonly bottomOutForce: number | null,
    readonly springLength: number | null,
    readonly switchFilm: string | null,
    readonly remark: string | null,
  ) {}
}
