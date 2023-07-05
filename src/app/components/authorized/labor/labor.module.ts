import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaborComponent } from './labor-rate/labor.component';
import { LaborRoutingModule } from './labor-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatherIconsModule } from 'src/app/common/components/shared/components/feather-icons/feather-icons.module';
import { SharedModule } from 'src/app/common/components/shared/shared.module';
import { ProjectRoutingModule } from '../project/project-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [ LaborComponent],
  imports: [
    CommonModule,
    LaborRoutingModule,
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
    MatTableModule,
    MatStepperModule,
    FeatherIconsModule,
    MatTooltipModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMenuModule,
    MatNativeDateModule

  ]
})
export class LaborModule { }
