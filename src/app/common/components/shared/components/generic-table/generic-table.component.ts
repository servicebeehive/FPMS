import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  @Input() columnDisplayNames: string[];
  @Input() pagination

  @Output() actionButtonItem = new EventEmitter<tableActionData<T>>();
  @ViewChild(MatSort) sort: MatSort;
  public dataSource = new MatTableDataSource();
  public columnNames: string[];

  constructor() { }

  ngOnChanges(): void {
    if (this.tableData) {
      if (this.tableData.length === 0) {
        return;
      }
     
      this.dataSource = new MatTableDataSource(this.tableData);
      console.log(this.dataSource)
      this.columnNames = [...this.columnDisplayNames, 'actions']
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, 0);
    }
  }
  // ngAfterViewInit(){
  //   this.dataSource.sort = this.sort;
  // }
  public actionButtonClicked(actionItem: tableActionData<T>) {
    this.actionButtonItem.emit(actionItem);
  }
}
