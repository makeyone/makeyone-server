import { KeyboardHousingFunctionKeyLayoutUnion } from '@src/core-enum/Post/KeyboardHousingFunctionKeyLayout.enum';
import { KeyboardHousingLayoutUnion } from '@src/core-enum/Post/KeyboardHousingLayout.enum';
import { KeyboardHousingMountUnion } from '@src/core-enum/Post/KeyboardHousingMount.enum';
import { KeyboardHousingWindowKeyLayoutUnion } from '@src/core-enum/Post/KeyboardHousingWindowKeyLayout.enum';

export class FindPostHousingResult {
  id: number;
  housingName: string;
  housingColor: string;
  housingMount: KeyboardHousingMountUnion;
  housingLayout: KeyboardHousingLayoutUnion;
  housingWindowKeyLayout: KeyboardHousingWindowKeyLayoutUnion;
  housingFunctionKeyLayout: KeyboardHousingFunctionKeyLayoutUnion;
  isHousingReAnodized: boolean;
}
