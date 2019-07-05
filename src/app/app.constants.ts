import {NavItemModel} from './models/nav-items.model';
import {UserNavModel} from './models/user-nav.model';
import {AppTitlesModel} from './models/app-titles.model';

const navItemsArray: NavItemModel[] = [
  {
    text: 'Organisation',
    href: '/organisation',
    active: true
  },
  {
    text: 'Users',
    href: '/users',
    active: false
  }
];

const roleBasedNav = {
  'pui-user-manager': navItemsArray[1],
  'pui-organisation-manager': navItemsArray[0]
};

const userNav: UserNavModel = {
  label: 'Account navigation',
  items: [{
    text: 'Sign out',
    emit: 'sign-out'
  }]
};

const regOrgTitle: AppTitlesModel = {
  name: 'Register to manage civil and family law cases',
  url: '/register-org/register/'
};

const manageOrgTitle: AppTitlesModel = {
  name: 'Manage Organisation',
  url: '/'
};

const FooterData =  {
  heading: 'Help',
  email: {
    address: 'service-desk@hmcts.gov.uk',
    text: 'service-desk@hmcts.gov.uk'
  },
  phone: {
    text: '0207 633 4140'
  },
  opening: {
    text: 'Monday to Friday, 8am to 6pm (excluding public holidays)'
  }
};

const FooterDataNavigation = {
  items: [
    { text: 'Terms and conditions', href: 'terms-and-conditions'},
    { text: 'Cookies', href: 'cookies' },
    { text: 'Privacy policy', href: 'privacy-policy'}
  ]
};

/**
 * Place to keep app constants.
 * Nice to have: The constants should also be injected into state to have single source of truth.
 */

export class AppConstants {
  static NAV_ITEMS = roleBasedNav;
  static USER_NAV = userNav;
  static REG_ORG_TITLE = regOrgTitle;
  static MANAGE_ORG_TITLE = manageOrgTitle;
  static FOOTER_DATA = FooterData;
  static FOOTER_DATA_NAVIGATION = FooterDataNavigation;
}
