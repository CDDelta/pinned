import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfilePinComponent } from './profile-pin/profile-pin.component';

@NgModule({
  declarations: [ProfileDetailComponent, ProfilePinComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
