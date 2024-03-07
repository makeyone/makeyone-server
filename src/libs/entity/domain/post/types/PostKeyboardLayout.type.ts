import { VIADefinitionV2, VIADefinitionV3, VIAKey } from '@the-via/reader';

export type PostKeyboardLayoutKeyType = VIAKey & { registeredSwitchId?: number };
export type PostKeyboardLayoutType = (VIADefinitionV2 | VIADefinitionV3) & {
  layouts: {
    keys: PostKeyboardLayoutKeyType[];
  };
};
