import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFilterComponent } from './components/project-filter/project-filter.component';
import { ProjectStatsComponent } from './components/project-stats/project-stats.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GenericTableRowComponent } from './components/generic-table-row/generic-table-row.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NumberDirective } from './directives/numbers-only.directive';
import { NumbersWithDecimalDirective } from './directives/numbers-with-decimal.directive';
import { FeatherIconsModule } from './components/feather-icons/feather-icons.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    ProjectFilterComponent,
    ProjectStatsComponent,
    GenericTableComponent,
    GenericTableRowComponent,
    CapitalizePipe,
    ConfirmationDialogComponent,
    NumberDirective,
    NumbersWithDecimalDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FeatherIconsModule,
    MatTooltipModule,
    FeatherIconsModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatSortModule,
  ],
  exports: [
    ProjectFilterComponent,
    ProjectStatsComponent,
    GenericTableComponent,
    GenericTableRowComponent,
    NumberDirective,
    NumbersWithDecimalDirective,
    CapitalizePipe,

  ]
})
export class SharedModule { }
