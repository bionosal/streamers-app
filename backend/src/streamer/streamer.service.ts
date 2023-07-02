import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StreamerDto, VoteEnumDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StreamerService {
  constructor(private prisma: PrismaService) {}

  async getStreamers() {
    const streamers = await this.prisma.streamer.findMany();

    return streamers;
  }

  async getStreamer(id: number) {
    const streamer = await this.prisma.streamer.findUnique({
      where: {
        id: id,
      },
    });

    if (!streamer) throw new NotFoundException('Streamer not found');

    return streamer;
  }

  async postStreamer(dto: StreamerDto) {
    try {
      const streamer = await this.prisma.streamer.create({
        data: {
          ...dto,
        },
      });

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
