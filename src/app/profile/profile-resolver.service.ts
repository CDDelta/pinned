import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, from, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { Profile } from '../shared/models/profile';
import { ProfileService } from '../shared/services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolverService implements Resolve<Profile> {
  constructor(private profileService: ProfileService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Profile> | Observable<never> {
    let profileId = route.paramMap.get('profileId');

    return from(this.profileService.getProfile(profileId)).pipe(
      take(1),
      mergeMap((profile) => {
        if (profile) {
          return of(profile);
        } else {
          this.router.navigateByUrl('/');
          return EMPTY;
        }
      }),
    );
  }
}
