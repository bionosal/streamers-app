import { Module } from '@nestjs/common';

import { GatewayService } from 'src/gateway/gateway.service';
import { StreamerController } from './streamer.controller';
import { StreamerService } from './streamer.service';

@Module({
  providers: [StreamerService, GatewayService],
  controllers: [StreamerController],
})
export class StreamerModule {}
