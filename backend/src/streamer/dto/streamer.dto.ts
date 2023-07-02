import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum PlatformEnum {
  Twitch = 'Twitch',
  YouTube = 'YouTube',
  TikTok = 'TikTok',
  Kick = 'Kick',
  Rumble = 'Rumble',
}

export class StreamerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEnum(PlatformEnum)
  platform: PlatformEnum;
  @IsString()
  @IsNotEmpty()
  avatar: string;
  @IsString()
  @IsNotEmpty()
  description: string;
}

export enum VoteEnumDto {
  Upvote = 'upvote',
  Downvote = 'downvote',
}
