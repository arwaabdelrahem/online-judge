import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ChangeStream } from 'mongodb';
import * as EJSON from 'mongodb-extjson';
import * as storage from 'node-persist';
import { ProductsRepo } from 'src/products/repos/products.repo';
import { UsersRepo } from 'src/users/repos/users.repo';

@Injectable()
export class ChangeStreamService implements OnApplicationBootstrap {
  constructor(
    private _productsRepo: ProductsRepo,
    private _usersRepo: UsersRepo,
  ) {}

  onApplicationBootstrap() {
    this.changeStream();
    this.listenForActiveUsers();
  }

  async changeStream() {
    const matchStages = [
      {
        $match: {
          'fullDocument.quantity': {
            $lte: 10,
          },
        },
      },
    ];

    const CS_TOKEN_KEY = 'changeStreamResumeToken';

    let changeStream: ChangeStream<any>;
    await storage.init({ dir: 'resumeTokens' });

    const token = await storage.getItem(CS_TOKEN_KEY);

    if (token) {
      console.log(`using resume token: ${token}`);
      changeStream = this._productsRepo.watch(matchStages, {
        resumeAfter: EJSON.parse(token),
        fullDocument: 'updateLookup',
      });
    } else {
      changeStream = this._productsRepo.watch(matchStages, {
        fullDocument: 'updateLookup',
      });
    }

    changeStream.on('change', async (change, err) => {
      if (err) {
        console.log('########## ', err);
      }
      console.log(
        '🚀 ~ file: products.service.ts:77 ~ ProductsService ~ changeStream.on ~ change:',
        change,
      );
      const resumeToken = EJSON.stringify(change._id);
      await storage.setItem(CS_TOKEN_KEY, resumeToken);
    });
    // const change = await changeStream.next();
    // console.log(
    //   '🚀 ~ file: change-stream.service.ts:57 ~ ChangeStreamService ~ changeStream ~ change:',
    //   change,
    // );

    // const resumeToken = EJSON.stringify(change._id);
    // await storage.setItem(CS_TOKEN_KEY, resumeToken);
  }

  async listenForActiveUsers() {
    console.log(
      '🚀 ~ file: change-stream.service.ts:72 ~ listenForActiveUsers:',
    );
    const matchStages = [
      {
        $match: {
          // $or: [
          //   { 'fullDocument.name': 'arwa' },
          //   { 'fullDocument.status': 'active' },
          // ],
        },
      },
    ];

    const CS_TOKEN_KEY = 'changeStreamResumeToken';

    let changeStream: ChangeStream<any>;
    await storage.init({ dir: 'resumeTokens' });

    const token = await storage.getItem(CS_TOKEN_KEY);

    if (token) {
      console.log(`using resume token: ${token}`);
      changeStream = this._usersRepo.watch(matchStages, {
        resumeAfter: EJSON.parse(token),
        fullDocument: 'updateLookup',
      });
    } else {
      changeStream = this._usersRepo.watch(matchStages, {
        fullDocument: 'updateLookup',
      });
    }

    changeStream.on('change', async (change, err) => {
      if (err) {
        console.log('########## USER', err);
      }
      console.log(
        '🚀 ~ file: products.service.ts:103 ~ ProductsService ~ changeStream.on ~ USEER change:',
        change,
      );
      const resumeToken = EJSON.stringify(change._id);
      await storage.setItem(CS_TOKEN_KEY, resumeToken);
    });
  }
}
