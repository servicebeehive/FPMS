import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

import { FeatherIconsModule } from '../shared/components/feather-icons/feather-icons.module';
@NgModule({
  declarations: [
    SideNavComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatMenuModule,
    // FeatherIconsModule
    MatIconModule,
    MatExpansionModule
    
  ],
  exports: [
    SideNavComponent,
    TopNavComponent,
  ]
})
export class LayoutModule { }
