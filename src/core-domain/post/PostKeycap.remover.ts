import { Injectable } from '@nestjs/common';

import { PostKeycapRepository } from '@src/database/entity/Post/PostKeycap.repository';

@Injectable()
export class PostKeycapRemover {
  constructor(private readonly postKeycapRepository: PostKeycapRepository) {}

  async removePostKeycap(keycapId: number): Promise<void> {
    await this.postKeycapRepository.removePostKeycap(keycapId);
  }
}
