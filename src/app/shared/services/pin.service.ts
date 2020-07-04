import { Injectable } from '@angular/core';
import { Pin } from '../models/pin';
import Arweave from 'arweave/web';
import { JWKInterface } from 'arweave/web/lib/wallet';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor(private arweaveClient: Arweave) {}

  async getPinIds(profileId?: string): Promise<string[]> {
    const appQueryCondition = {
      op: 'and',
      expr1: {
        op: 'equals',
        expr1: 'App-Name',
        expr2: 'pinned',
      },
      expr2: {
        op: 'equals',
        expr1: 'Type',
        expr2: 'pin',
      },
    };

    return this.arweaveClient.arql(
      profileId
        ? {
            op: 'and',
            expr1: {
              op: 'equals',
              expr1: 'from',
              expr2: profileId,
            },
            expr2: appQueryCondition,
          }
        : appQueryCondition,
    );
  }

  async getPin(pinId: string): Promise<Pin> {
    const pinJson = (await this.arweaveClient.transactions.getData(pinId, {
      decode: true,
      string: true,
    })) as string;

    const pin = JSON.parse(pinJson);

    return pin;
  }

  async publishPin(pin: Pin, key: JWKInterface): Promise<string> {
    let transaction = await this.arweaveClient.createTransaction(
      {
        data: JSON.stringify(pin),
      },
      key,
    );

    transaction.addTag('Content-Type', 'application/json');
    transaction.addTag('App-Name', 'pinned');
    transaction.addTag('Type', 'pin');

    await this.arweaveClient.transactions.sign(transaction, key);

    await this.arweaveClient.transactions.post(transaction);

    return transaction.id;
  }

  async getPinPublishStatus(pinId: string): Promise<boolean> {
    const statusRes = await this.arweaveClient.transactions.getStatus(pinId);
    return statusRes.status === 200;
  }
}
