import { Injectable, OnModuleInit } from '@nestjs/common';
import * as deepstream from 'deepstream.io-client-js';

@Injectable()
export class RealtimeService implements OnModuleInit {
  private _client;

  async onModuleInit() {
    const options = {
      maxReconnectInterval: 1000,
      reconnectIntervalIncrement: 500,
      maxReconnectAttempts: Infinity,
      heartbeatInterval: 60000,
      silentDeprecation: true,
    };

    this._client = deepstream('localhost:6020', options);

    this._client.on('connectionStateChanged', (connection) => {
      console.log(
        '🚀 ~ file: realtime.service.ts:27 ~ RealtimeService ~ this._client.on ~ connection:',
        connection,
      );
      if (connection === 'OPEN')
        console.log('[!] Deepstream Connected: ', 'localhost:6020');
    });

    this._client.on('error', (err) => console.log('Deepstream Error: ', err));

    this._client.login();
  }

  getRecord(recordName: string) {
    return this._client.record.getRecord(recordName);
  }

  eventEmit(event: string, value: any) {
    this._client.event.emit(event, value);
  }
}
