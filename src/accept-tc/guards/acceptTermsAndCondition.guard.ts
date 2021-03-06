import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromUserProfile from '../../user-profile/store';
import * as fromRoot from '../../app/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class AcceptTermsAndConditionGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.State>,
  ) {
  }

  canActivate(): Observable<boolean> {
    // returning true to help to resolve prod issues [4th March 2020]
    return of(true)
    // return this.checkStore().pipe(
    //   switchMap(() => of(true)),
    //   catchError(() => of(false))
    // );
  }

  checkStore() {
    return this.store.pipe(select(fromUserProfile.getHasUserSelectedTC),
      tap(tcConfirmed => {
        if (!tcConfirmed.loaded) {
          this.store.pipe(select(fromUserProfile.getUid), take(2)).subscribe(uid => {
            if (uid) {
              this.store.dispatch(new fromUserProfile.LoadHasAcceptedTC(uid));
            }
          });
        }
        if (tcConfirmed.hasUserAccepted === 'true') {
          this.store.dispatch(new fromRoot.Go({path: ['/home']}));
        }

      }),
      filter(tcConfirmed => tcConfirmed.loaded),
      take(1)
    );
  }


}
