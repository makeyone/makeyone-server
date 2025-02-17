import { KeyboardHousingFunctionKeyLayoutUnion } from '@src/core/core-enum/Post/KeyboardHousingFunctionKeyLayout.enum';
import { KeyboardHousingLayoutUnion } from '@src/core/core-enum/Post/KeyboardHousingLayout.enum';
import { KeyboardHousingMountUnion } from '@src/core/core-enum/Post/KeyboardHousingMount.enum';
import { KeyboardHousingWindowKeyLayoutUnion } from '@src/core/core-enum/Post/KeyboardHousingWindowKeyLayout.enum';

export class FindPostHousingResult {
  constructor(
    readonly id: number,
    readonly housingName: string,
    readonly housingColor: string,
    readonly housingMount: KeyboardHousingMountUnion,
    readonly housingLayout: KeyboardHousingLayoutUnion,
    readonly housingWindowKeyLayout: KeyboardHousingWindowKeyLayoutUnion,
    readonly housingFunctionKeyLayout: KeyboardHousingFunctionKeyLayoutUnion,
    readonly isHousingReAnodized: boolean,
  ) {}
}
