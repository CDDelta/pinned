import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';
import { ProfileResolverService } from './profile-resolver.service';

const routes: Routes = [
  {
    path: ':profileId',
    component: ProfileDetailComponent,
    resolve: {
      profile: ProfileResolverService,
    },
  },
  {
    path: ':profileId/i/:postId',
    component: ProfilePostComponent,
    resolve: {
      profile: ProfileResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
