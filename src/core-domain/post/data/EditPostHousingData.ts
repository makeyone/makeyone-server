import { KeyboardHousingFunctionKeyLayoutUnion } from '@src/core-enum/Post/KeyboardHousingFunctionKeyLayout.enum';
import { KeyboardHousingLayoutUnion } from '@src/core-enum/Post/KeyboardHousingLayout.enum';
import { KeyboardHousingMountUnion } from '@src/core-enum/Post/KeyboardHousingMount.enum';
import { KeyboardHousingWindowKeyLayoutUnion } from '@src/core-enum/Post/KeyboardHousingWindowKeyLayout.enum';

export class EditPostHousingData {
  constructor(
    readonly housingName: string,
    readonly housingColor: string,
    readonly housingMount: KeyboardHousingMountUnion,
    readonly housingLayout: KeyboardHousingLayoutUnion,
    readonly housingWindowKeyLayout: KeyboardHousingWindowKeyLayoutUnion,
    readonly housingFunctionKeyLayout: KeyboardHousingFunctionKeyLayoutUnion,
    readonly isHousingReAnodized: boolean,
  ) {}
}