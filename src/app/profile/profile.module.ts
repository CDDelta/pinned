import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfilePinComponent } from './profile-pin/profile-pin.component';
import { ProfilePinStatusComponent } from './profile-pin-status/profile-pin-status.component';

@NgModule({
  declarations: [ProfileDetailComponent, ProfilePinComponent, ProfilePinStatusComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
