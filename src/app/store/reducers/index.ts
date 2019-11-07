import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params,
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromApp from '../reducers/app.reducer';
import * as fromTC from '../../../accept-tc/store/reducers/acept-tc.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  appState: fromApp.AppState;
  TCAccepted: fromTC.TermsAndCondition;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  appState: fromApp.reducer,
  TCAccepted: fromTC.reducer,
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
  >('routerReducer');

export const getRootAppState = createFeatureSelector<fromApp.AppState>(
  'appState'
);

export const getTCAccepted = createFeatureSelector<fromApp.AppState>(
  'TCAccepted'
) as any;

export const getRouterUrl = createSelector(
  getRouterState,
  state => state.state.url
);

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
