import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { HeaderDetialsComponent } from './header-detials/header-detials.component';
import { MatCardModule } from '@angular/material/card';
import { AttachmentDetailsComponent } from './attachment-details/attachment-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CapitalizePipe } from 'src/app/common/components/shared/pipes/capitalize.pipe';
import { SharedModule } from 'src/app/common/components/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [SummaryComponent, ProjectDetailsComponent, HeaderDetialsComponent, AttachmentDetailsComponent],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    SharedModule
  ]
})
export class SummaryModule { }
