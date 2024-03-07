import { VIADefinitionV2, VIADefinitionV3, VIAKey } from '@the-via/reader';

import { PostSwitchEntity } from '@src/libs/entity/domain/post/PostSwitch.entity';

export type PostKeyboardLayoutKey = VIAKey & {
  registeredSwitch?: Pick<PostSwitchEntity, 'id' | 'switchName'>;
};

export type PostKeyboardLayoutOptionKey = {
  [g: string]: {
    [o: string]: (VIAKey & {
      registeredSwitch?: Pick<PostSwitchEntity, 'id' | 'switchName'>;
    })[];
  };
};

export type PostKeyboardDefinitionType = (VIADefinitionV2 | VIADefinitionV3) & {
  layouts: {
    keys: PostKeyboardLayoutKey[];
    optionKeys: PostKeyboardLayoutOptionKey;
  };
};
