import { Module } from '@nestjs/common';

import { GatewayModule } from './gateway/gateway.module';
import { PrismaModule } from './prisma/prisma.module';
import { StreamerModule } from './streamer/streamer.module';

@Module({
  imports: [StreamerModule, PrismaModule, GatewayModule],
})
export class AppModule {}
