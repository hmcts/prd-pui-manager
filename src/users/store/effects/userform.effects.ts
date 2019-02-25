import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as userformActions from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserformService } from '../../services/userform.service';



@Injectable()
export class UserformEffects {
  constructor(
    private actions$: Actions,
    private userformService: UserformService
  ) { }


  @Effect()
  saveUsers$ = this.actions$.pipe(
    ofType(userformActions.SAVE_USER),
    map((action: userformActions.SaveUser) => action.payload),
    switchMap((formdata) => {
      return this.userformService.saveUser(formdata).pipe(
        map(userDetails => new userformActions.SaveUserSuccess(userDetails)),
        catchError(error => of(new userformActions.SaveUserFail(error)))
      );
    })
  );
}


