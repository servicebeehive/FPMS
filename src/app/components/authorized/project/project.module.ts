import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectCreationComponent } from './project-creation/project-creation.component';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { ProjectComponentsComponent } from './project-components/project-components.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectCreationComponent,
    ProjectHeaderComponent,
    ProjectComponentsComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
})
export class ProjectModule { }
