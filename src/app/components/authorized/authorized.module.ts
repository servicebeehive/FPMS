import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizedRoutingModule } from './authorized-routing.module';
import { AuthorizedComponent } from './authorized.component';
import { LayoutModule } from 'src/app/common/components/layout/layout.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AuthorizedComponent,
  ],
  imports: [
    CommonModule,
    AuthorizedRoutingModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatSidenavModule
  ]
})
export class AuthorizedModule { }
