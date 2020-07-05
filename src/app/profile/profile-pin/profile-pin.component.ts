import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../../shared/models/profile';
import { Pin } from '../../shared/models/pin';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-pin',
  templateUrl: './profile-pin.component.html',
  styleUrls: ['./profile-pin.component.scss'],
})
export class ProfilePinComponent implements OnInit {
  public profile: Profile;
  public pin: Pin;
  public imageUrl: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.profile = data.profile;
      this.pin = data.pin;
      this.imageUrl = `${environment.arweavePeerDomain}/${this.pin.imageId}`;
    });
  }
}
