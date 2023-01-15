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
    MatPaginatorModule
  ],
  exports: [
    ProjectFilterComponent,
    ProjectStatsComponent,
    GenericTableComponent,
    GenericTableRowComponent
  ]
})
export class SharedModule { }
