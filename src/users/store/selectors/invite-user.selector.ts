import { createSelector } from '@ngrx/store';

import * as fromFeature from '../../store/reducers';
import * as fromInviteUsers from '../reducers/invite-user.reducer';

export const getInviteUserState = createSelector(
  fromFeature.getRootUserState,
  (state: fromFeature.UserState) => state.inviteUser
);

export const getGetInviteUserErrorMessage = createSelector(
  getInviteUserState,
  fromInviteUsers.getInviteUserErrorMessage
);

export const getGetInviteUserArray = createSelector(
  getGetInviteUserErrorMessage,
  obj => {
    return Object.values(obj).map(key => {
      if (key) {
        return key.messages.filter((el) => el !== '');
      }
    });

  }
);
