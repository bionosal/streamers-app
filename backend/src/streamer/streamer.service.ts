import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { GatewayService } from 'src/gateway/gateway.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StreamerDto, VoteEnumDto } from './dto';

@Injectable()
export class StreamerService {
  constructor(private prisma: PrismaService, private gateway: GatewayService) {}

  async getStreamers() {
    // Retrieve all streamers from the database

    const streamers = await this.prisma.streamer.findMany();
    return streamers;
  }

  async getStreamer(id: number) {
    // Retrieve a specific streamer by ID from the database

    const streamer = await this.prisma.streamer.findUnique({
      where: {
        id: id,
      },
    });

    if (!streamer) throw new NotFoundException('Streamer not found');

    return streamer;
  }

  async postStreamer(dto: StreamerDto) {
    // Create a new streamer in the database

    try {
      const streamer = await this.prisma.streamer.create({
        data: {
          ...dto,
        },
      });
      this.gateway.server.emit('onNewStreamer', streamer);
      return streamer;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Streamer already exist');
        }
      }
      throw error;
    }
  }

  async voteStreamer(id: number, vote: VoteEnumDto) {
    // Vote for a specific streamer

    try {
      const streamer = await this.prisma.streamer.update({
        where: {
          id: id,
        },
        data: {
          [vote]: {
            increment: 1,
          },
        },
      });
      this.gateway.server.emit('onStreamerVote', streamer);
      return streamer;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Streamer not found');
        }
      }
      throw error;
    }
  }
}
