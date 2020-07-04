import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import Arweave from 'arweave/web';
import * as ArweaveId from 'arweave-id';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private arweaveClient: Arweave) {}

  getProfile(profileId: string): Promise<Profile> {
    return ArweaveId.get(profileId, this.arweaveClient);
  }
}
