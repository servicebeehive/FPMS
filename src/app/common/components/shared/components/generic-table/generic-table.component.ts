import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tableActionData } from 'src/app/common/models/table-action-data.model';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T> implements OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() tableData: T[] = [];
  @Input() actionButtons: string[];
  @Input() title: string;

  @Output() actionButtonItem = new EventEmitter<tableActionData<T>>();

  dataSource = new MatTableDataSource();

  columnNames: string[];

  constructor() { }

  ngOnChanges(): void {
    if (this.tableData) {
      if (this.tableData.length === 0) {
        return;
      }
      this.dataSource = new MatTableDataSource(this.tableData);
      this.columnNames = Object.keys(this.tableData[0]);
      this.columnNames = [...this.columnNames, 'actions']
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    }
  }

  public actionButtonClicked(actionItem: tableActionData<T>) {
    this.actionButtonItem.emit(actionItem);
  }
}
