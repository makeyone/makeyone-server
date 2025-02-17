import { Module } from '@nestjs/common';

import { HealthController } from '@src/core/core-api/controller/health/v1/Health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
