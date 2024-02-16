import { Entity } from 'typeorm';

import { IncludeSoftDeleteCoreEntity } from '@src/libs/entity/domain/common/Core.entity';

@Entity({ name: 'post' })
export class PostEntity extends IncludeSoftDeleteCoreEntity {}
