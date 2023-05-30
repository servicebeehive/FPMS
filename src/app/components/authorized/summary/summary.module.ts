import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { MatCardModule } from '@angular/material/card';
import { AttachmentDetailsComponent } from './attachment-details/attachment-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/common/components/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectModule } from '../project/project.module';
import { FeatherModule } from 'angular-feather';
import { FeatherIconsModule } from 'src/app/common/components/shared/components/feather-icons/feather-icons.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [SummaryComponent, ProjectDetailsComponent, AttachmentDetailsComponent],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    ProjectModule,FeatherIconsModule, MatTooltipModule
  ]
})
export class SummaryModule { }
