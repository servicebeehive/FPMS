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


@NgModule({
  declarations: [
    ProjectFilterComponent,
    ProjectStatsComponent,
    GenericTableComponent,
    GenericTableRowComponent,
    CapitalizePipe
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
    MatCardModule
  ],
  exports: [
    ProjectFilterComponent,
    ProjectStatsComponent,
    GenericTableComponent,
    GenericTableRowComponent
  ]
})
export class SharedModule { }
