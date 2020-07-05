import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, from, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { Pin } from '../../shared/models/pin';
import { PinService } from '../../shared/services/pin.service';

@Injectable({
  providedIn: 'root',
})
export class PinResolverService {
  constructor(private pinService: PinService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Pin> | Observable<never> {
    let pinId = route.paramMap.get('pinId');

    return from(this.pinService.getPin(pinId)).pipe(
      take(1),
      mergeMap((pin) => {
        if (pin) {
          return of(pin);
        } else {
          this.router.navigateByUrl('/');
          return EMPTY;
        }
      }),
    );
  }
}
