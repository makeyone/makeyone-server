import { KeyboardSwitchLubeUnion } from '@src/core-enum/Post/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion } from '@src/core-enum/Post/KeyboardSwitchType.enum';

export class FindPostSwitchResult {
  id: number;
  switchName: string;
  switchType: KeyboardSwitchTypeUnion;
  isSlientSwitch: boolean;
  switchLube: KeyboardSwitchLubeUnion;
  bottomOutForce: number | null;
  springLength: number | null;
  switchFilm: string | null;
  remark: string | null;
}
