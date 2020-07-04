import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./landing/landing-routing.module').then(
        (m) => m.LandingRoutingModule,
      ),
  },
  {
    path: 'p',
    loadChildren: () =>
      import('./profile/profile-routing.module').then(
        (m) => m.ProfileRoutingModule,
      ),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./upload/upload-routing.module').then(
        (m) => m.UploadRoutingModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
