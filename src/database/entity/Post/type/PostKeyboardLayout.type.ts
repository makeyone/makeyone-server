import { VIADefinitionV2, VIADefinitionV3, VIAKey } from '@the-via/reader';

import { PostKeycapEntity } from '@src/database/entity/Post/PostKeycap.entity';
import { PostSwitchEntity } from '@src/database/entity/Post/PostSwitch.entity';

export type PostKeyboardLayoutKey = VIAKey & {
  registeredSwitch?: Pick<PostSwitchEntity, 'id' | 'switchName'>;
  registeredKeycap?: Pick<PostKeycapEntity, 'id' | 'keycapName'>;
};

export type PostKeyboardLayoutOptionKey = {
  [g: string]: {
    [o: string]: (VIAKey & {
      registeredSwitch?: Pick<PostSwitchEntity, 'id' | 'switchName'>;
      registeredKeycap?: Pick<PostKeycapEntity, 'id' | 'keycapName'>;
    })[];
  };
};

export type PostKeyboardDefinitionType = (VIADefinitionV2 | VIADefinitionV3) & {
  layouts: {
    keys: PostKeyboardLayoutKey[];
    optionKeys: PostKeyboardLayoutOptionKey;
  };
};
