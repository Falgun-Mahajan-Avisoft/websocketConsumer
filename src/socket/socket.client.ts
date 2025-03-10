import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;
  constructor() {
    this.socketClient = io('http://localhost:3000');
  }

  onModuleInit() {
    this.registerConsumerEvents();
  }

  private registerConsumerEvents() {
    this.socketClient.on('connect', () => {
      console.log('connected to gateway');
    });

    this.socketClient.emit('message',{msg:"Hello, how are you"})
    this.socketClient.on('onMessage',(payload)=>{
        console.log(payload)
    })
  }
}
