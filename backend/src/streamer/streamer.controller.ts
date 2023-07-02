import {
  Body,
  Controller,
  Get,
  Post,
  ParseIntPipe,
  Param,
  ParseEnumPipe,
  Put,
} from '@nestjs/common';

import { StreamerDto, VoteEnumDto } from './dto';
import { StreamerService } from './streamer.service';

@Controller('streamers')
export class StreamerController {
  constructor(private streamerService: StreamerService) {}

  @Get()
  getStreamers() {
    // Get all streamers

    return this.streamerService.getStreamers();
  }

  @Get(':id')
  getStreamer(@Param('id', ParseIntPipe) id: number) {
    // Get a specific streamer by ID

    return this.streamerService.getStreamer(id);
  }

  @Post()
  postStreamer(@Body() dto: StreamerDto) {
    // Create a new streamer

    return this.streamerService.postStreamer(dto);
  }

  @Put(':id/vote')
  voteStreamer(
    @Param('id', ParseIntPipe) id: number,
    @Body('vote', new ParseEnumPipe(VoteEnumDto)) vote: VoteEnumDto,
  ) {
    // Vote for a specific streamer

    return this.streamerService.voteStreamer(id, vote);
  }
}
