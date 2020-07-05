import { Injectable } from '@angular/core';
import { Pin } from '../models/pin';
import Arweave from 'arweave/web';
import { JWKInterface } from 'arweave/web/lib/wallet';
import Transaction from 'arweave/web/lib/transaction';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor(private arweaveClient: Arweave) {}

  async getPinIds(profileId?: string): Promise<string[]> {
    const appQueryCondition = {
      op: 'and',
      expr1: {
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: 'App-Name',
          expr2: environment.appName,
        },
        expr2: {
          op: 'equals',
          expr1: 'App-Version',
          expr2: environment.appVersion,
        },
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

  async publishPin(
    pin: Partial<Pin>,
    pinImgFile: File,
    key: JWKInterface,
  ): Promise<string> {
    let imgTransaction = await this.arweaveClient.createTransaction(
      {
        data: await this.fileToUintArray(pinImgFile),
      },
      key,
    );

    imgTransaction.addTag('Content-Type', pinImgFile.type);
    imgTransaction.addTag('Type', 'pin-img');

    await this.arweaveClient.transactions.sign(imgTransaction, key);
    await this.arweaveClient.transactions.post(imgTransaction);

    pin.imageId = imgTransaction.id;

    let pinTransaction = await this.arweaveClient.createTransaction(
      {
        data: JSON.stringify(pin),
      },
      key,
    );

    this.addTransactionAppTags(pinTransaction);
    pinTransaction.addTag('Content-Type', 'application/json');
    pinTransaction.addTag('Type', 'pin');

    await this.arweaveClient.transactions.sign(pinTransaction, key);
    await this.arweaveClient.transactions.post(pinTransaction);

    return pinTransaction.id;
  }

  async getPinPublishStatus(pinId: string): Promise<boolean> {
    const statusRes = await this.arweaveClient.transactions.getStatus(pinId);
    return statusRes.status === 200;
  }

  private addTransactionAppTags(transaction: Transaction): void {
    transaction.addTag('App-Name', environment.appName);
    transaction.addTag('App-Version', environment.appVersion);
    transaction.addTag('Unix-Time', Date.now().toString());
  }

  private fileToUintArray(file: File): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = (e) => {
        resolve(new Uint8Array(e.target.result as ArrayBuffer));
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
