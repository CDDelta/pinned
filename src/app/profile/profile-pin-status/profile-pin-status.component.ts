import { Component, OnInit } from '@angular/core';
import { Observable, timer, combineLatest } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';
import { PinService } from '../../shared/services/pin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-pin-status',
  templateUrl: './profile-pin-status.component.html',
  styleUrls: ['./profile-pin-status.component.scss'],
})
export class ProfilePinStatusComponent implements OnInit {
  public profileId: string;
  public pinId: string;
  public pinPublished$: Observable<boolean>;

  constructor(private pinService: PinService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pinPublished$ = combineLatest(
      this.route.params.pipe(
        tap((params) => (this.profileId = params['profileId'])),
        map((params) => {
          this.pinId = params['pinId'];
          return this.pinId;
        }),
      ),
      timer(0, 30 * 1000),
    ).pipe(flatMap(([pinId]) => this.pinService.getPinPublishStatus(pinId)));
  }
}
