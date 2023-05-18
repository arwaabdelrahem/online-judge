import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ChangeStream } from 'mongodb';
import * as EJSON from 'mongodb-extjson';
import * as storage from 'node-persist';
import { ProductsRepo } from 'src/products/repos/products.repo';

@Injectable()
export class ChangeStreamService implements OnApplicationBootstrap {
  constructor(private _productsRepo: ProductsRepo) {}

  onApplicationBootstrap() {
    this.changeStream();
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
}
