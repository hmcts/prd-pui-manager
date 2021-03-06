import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HealthCheckGuard } from '../shared/guards/health-check.guard';
import { AcceptTcWrapperComponent } from './containers/accept-tc-wrapper.component';
import { reducers, effects } from './store';

// containers
import * as fromContainers from './containers';
// services
import * as fromServices from './services';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

const ROUTES = [
  {
    path: '',
    component: AcceptTcWrapperComponent,
    canActivate: [HealthCheckGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    StoreModule.forFeature('acceptTc', reducers),
    EffectsModule.forFeature(effects),
    FormsModule,
    ExuiCommonLibModule.forChild()
  ],
  exports: [...fromContainers.containers],
  declarations: [...fromContainers.containers],
  providers: [...fromServices.services]
})

/**
 * Entry point to AcceptTandC
 */
export class AcceptTcModule {}
