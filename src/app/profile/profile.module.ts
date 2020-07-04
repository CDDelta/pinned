import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';

@NgModule({
  declarations: [ProfileComponent, ProfilePostComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
