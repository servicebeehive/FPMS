import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectComponentStateRoutingModule } from './project-component-state-routing.module';
import { ProjectComponetStateComponent } from './project-componet-state.component';
import { ProjectRoutingModule } from '../../project-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/common/components/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { FeatherIconsModule } from 'src/app/common/components/shared/components/feather-icons/feather-icons.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectHeaderDetailsComponent } from '../../project-header-details/project-header-details.component';


@NgModule({
  declarations: [ProjectComponetStateComponent,ProjectHeaderDetailsComponent],
  imports: [
    CommonModule,
    ProjectComponentStateRoutingModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    SharedModule,
    MatExpansionModule,
    MatTableModule,
    MatStepperModule,
    FeatherIconsModule,
    MatTooltipModule,
    
    MatMenuModule

  ]
})
export class ProjectComponentStateModule { }
