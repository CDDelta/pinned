import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import Arweave from 'arweave/web';
import * as ArweaveId from 'arweave-id';
import { JWKInterface } from 'arweave/web/lib/wallet';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private arweaveClient: Arweave) {}

  getProfileIdFromKey(key: JWKInterface): Promise<string> {
    return this.arweaveClient.wallets.jwkToAddress(key);
  }

  getProfile(profileId: string): Promise<Profile> {
    return ArweaveId.get(profileId, this.arweaveClient);
  }
}
