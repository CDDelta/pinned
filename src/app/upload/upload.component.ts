import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { JWKInterface } from 'arweave/web/lib/wallet';
import { ProfileService } from '../shared/services/profile.service';
import { PinService } from '../shared/services/pin.service';
import { Profile } from '../shared/models/profile';
import { Pin } from '../shared/models/pin';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public key: JWKInterface;

  public pinForm = this.fb.group({
    title: ['', Validators.required],
    tags: [''],
    url: [''],
    description: [''],
  });

  public profile: Profile;

  public loadingProfile = false;
  public publishingPin = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private pinService: PinService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  async publishPin(): Promise<void> {
    this.pinForm.markAllAsTouched();

    if (this.pinForm.invalid) return;

    const formValue = this.pinForm.value;

    const pin: Pin = {
      title: formValue.title,
      tags: (formValue.tags as string).split(',').map((t) => t.trim()),
      destinationUrl: formValue.url,
      description: formValue.description,
    };

    this.publishingPin = true;
    this.pinForm.disable();

    const profileId = await this.profileService.getProfileIdFromKey(this.key);
    const pinId = ''; //await this.pinService.publishPin(pin, this.key);
    this.router.navigateByUrl(`/u/${profileId}/p/${pinId}/status`);
  }

  async handleKeyFile(files: FileList): Promise<void> {
    const key = JSON.parse(await files.item(0).text());

    this.loadingProfile = true;

    const profileId = await this.profileService.getProfileIdFromKey(key);
    this.profile = {
      id: profileId,
      ...(await this.profileService.getProfile(profileId)),
    };

    this.loadingProfile = false;
    this.key = key;
  }
}
