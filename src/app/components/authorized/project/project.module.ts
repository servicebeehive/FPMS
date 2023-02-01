import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectCreationComponent } from './project-creation/project-creation.component';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { ProjectComponentsComponent } from './project-components/project-components.component';

import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/common/components/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { CreateComponentsComponent } from './dialogs/create-components/create-components.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { ProjectComponentElementsComponent } from './project-component-elements/project-component-elements.component';
import { ProjectComponentHeadersComponent } from './project-component-headers/project-component-headers.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectCreationComponent,
    ProjectHeaderComponent,
    ProjectComponentsComponent,
    CreateComponentsComponent,
    ProjectComponentElementsComponent,
    ProjectComponentHeadersComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
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
    MatTableModule
  ],
})
export class ProjectModule { }
