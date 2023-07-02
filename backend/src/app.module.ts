import { Module } from '@nestjs/common';
import { StreamerModule } from './streamer/streamer.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [StreamerModule, PrismaModule],
})
export class AppModule {}
