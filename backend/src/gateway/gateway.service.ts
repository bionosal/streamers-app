import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class GatewayService implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }
}
