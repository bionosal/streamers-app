import { Module } from '@nestjs/common';
import { StreamerService } from './streamer.service';
import { StreamerController } from './streamer.controller';
import { GatewayService } from 'src/gateway/gateway.service';

@Module({
  providers: [StreamerService, GatewayService],
  controllers: [StreamerController],
})
export class StreamerModule {}
