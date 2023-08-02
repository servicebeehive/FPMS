import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/common/components/shared/shared.module';
import { FeatherIconsModule } from 'src/app/common/components/shared/components/feather-icons/feather-icons.module';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FeatherIconsModule, MatButtonModule,MatMenuModule
  ]
})
export class DashboardModule { }
