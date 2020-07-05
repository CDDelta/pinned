import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { flatMap, scan, tap, map } from 'rxjs/operators';
import { NgxMasonryOptions } from 'ngx-masonry';
import { Pin } from '../../models/pin';
import { WithId } from '../../models/with-id';
import { PinService } from '../../services/pin.service';
import { environment } from 'src/environments/environment';

const PAGE_SIZE = 9;

@Component({
  selector: 'app-pin-grid',
  templateUrl: './pin-grid.component.html',
  styleUrls: ['./pin-grid.component.scss'],
})
export class PinGridComponent implements OnInit {
  @Input() public profileId: string;

  public pinsQuery$: Observable<{
    loading: boolean;
    atEnd: boolean;
    pins: (Pin & WithId)[];
  }>;
  public loadMoreEvent$ = new BehaviorSubject<any>(null);

  public imagePeerHost = environment.arweavePeerDomain;

  public options: NgxMasonryOptions = {
    gutter: 18,
  };

  private pinIds: string[] = [];
  private pins$ = new BehaviorSubject<(Pin & WithId)[]>([]);
  private pinsLoading$ = new BehaviorSubject<boolean>(true);
  private lastPinIndex = 0;

  constructor(private pinService: PinService) {}

  ngOnInit(): void {
    this.loadMoreEvent$
      .pipe(
        tap(() => this.pinsLoading$.next(true)),
        flatMap(() =>
          !this.pinIds.length
            ? this.pinService.getPinIds(this.profileId)
            : Promise.resolve(this.pinIds),
        ),
        tap((pinIds) => (this.pinIds = pinIds)),
        flatMap(() =>
          Promise.allSettled(
            this.pinIds
              .slice(this.lastPinIndex, this.lastPinIndex + PAGE_SIZE)
              .map((quizId) => this.pinService.getPin(quizId)),
          ),
        ),
        map((results) =>
          results
            .map((r, i) => {
              if (r.status === 'rejected' || !r.value) return null;
              return r.value;
            })
            .filter((q) => q),
        ),
        scan((whole, page) => whole.concat(page)),
        tap(() => {
          this.lastPinIndex = Math.min(
            this.lastPinIndex + PAGE_SIZE,
            this.pinIds.length,
          );

          this.pinsLoading$.next(false);
        }),
      )
      .subscribe(this.pins$);

    this.pinsQuery$ = combineLatest(this.pinsLoading$, this.pins$).pipe(
      map(([loading, pins]) => ({
        loading,
        atEnd: this.lastPinIndex === this.pinIds.length,
        pins,
        /*pins.length > 0
            ? (new Array(8).fill(pins[0]) as (Pin & WithId)[])
            : [],*/
      })),
    );
  }
}
