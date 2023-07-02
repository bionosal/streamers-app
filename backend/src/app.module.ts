import { Module } from '@nestjs/common';
import { StreamerModule } from './streamer/streamer.module';
import { PrismaModule } from './prisma/prisma.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [StreamerModule, PrismaModule, GatewayModule],
})
export class AppModule {}
