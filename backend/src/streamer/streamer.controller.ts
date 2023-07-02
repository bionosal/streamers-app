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
import { StreamerService } from './streamer.service';
import { StreamerDto, VoteEnumDto } from './dto';

@Controller('streamers')
export class StreamerController {
  constructor(private streamerService: StreamerService) {}

  @Get()
  getStreamers() {
    return this.streamerService.getStreamers();
  }

  @Get(':id')
  getStreamer(@Param('id', ParseIntPipe) id: number) {
    return this.streamerService.getStreamer(id);
  }

  @Post()
  postStreamer(@Body() dto: StreamerDto) {
    return this.streamerService.postStreamer(dto);
  }

  @Put(':id/vote')
  voteStreamer(
    @Param('id', ParseIntPipe) id: number,
    @Body('vote', new ParseEnumPipe(VoteEnumDto)) vote: VoteEnumDto,
  ) {
    return this.streamerService.voteStreamer(id, vote);
  }
}
