import { Module } from '@nestjs/common';

import { HealthController } from '@src/core-api/health/controller/v1/Health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
