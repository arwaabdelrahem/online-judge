import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventsName } from '../common/constants';

@WebSocketGateway({ cors: true })
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  public async socketEmitEvent(event: string, data: any) {
    this.server.emit(event, data);
  }

  @SubscribeMessage(EventsName.FAILED_TEST_CASE)
  public async failedTestCaseListen(@MessageBody() data: string) {
    console.log(
      '🚀 ~ file: app.gateway.ts:20 ~ AppGateway ~ joinRoom ~ value:',
      data,
    );

    return data;
  }

  @SubscribeMessage(EventsName.PASSED_TEST_CASE)
  public async passedTestCaseListen(@MessageBody() data: string) {
    console.log(
      '🚀 ~ file: app.gateway.ts:20 ~ AppGateway ~ joinRoom ~ value:',
      data,
    );

    return data;
  }
}
