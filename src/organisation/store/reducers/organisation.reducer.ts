import * as fromOrganisation from '../actions/organisation.actions';
import { Organisation } from 'src/organisation/organisation.model';
export interface OrganisationState {
  organisationDetails: Organisation;
  loaded: boolean;
  loading: boolean;
}

export const initialState: OrganisationState = {
  organisationDetails: new Organisation({}),
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromOrganisation.organisationActions
): OrganisationState {
  switch (action.type) {

    case fromOrganisation.LOAD_ORGANISATION: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case fromOrganisation.LOAD_ORGANISATION_SUCCESS: {
      const organisationDetails = new Organisation(action.payload);
      return {
        ...state,
        organisationDetails,
        loaded: true
      };

    }

    case fromOrganisation.UPDATE_ORGANISATION_PBA_PENDING_ADD: {
      const organisationDetails = new Organisation(state.organisationDetails);
      const pendingAddPbaNumbers = action.payload as string[];
      const uniquePendingPba = pendingAddPbaNumbers.filter((i, p, s) => s.indexOf(i) == p);

      organisationDetails.pendingAddPaymentAccount = uniquePendingPba;

      return {
        ...state,
        organisationDetails
      }
    }

    case fromOrganisation.UPDATE_ORGANISATION_PBA_PENDING_REMOVE: {
      const organisationDetails = new Organisation(state.organisationDetails);
      const pendingRemovePbaNumbers = action.payload as string[];
      const uniquePendingPba = pendingRemovePbaNumbers.filter((i, p, s) => s.indexOf(i) == p);

      organisationDetails.pendingRemovePaymentAccount = uniquePendingPba;

      return {
        ...state,
        organisationDetails
      }
    }
  }

  return state;
}

export const getOrganisation = (state: OrganisationState) => state.organisationDetails;
export const getOrganisationLoading = (state: OrganisationState) => state.loading;
export const getOrganisationLoaded = (state: OrganisationState) => state.loaded;
