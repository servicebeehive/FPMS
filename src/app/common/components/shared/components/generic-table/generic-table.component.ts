import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T> implements OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() tableData: T[];
  @Input() actionButtons: string[];


  dataSource = new MatTableDataSource();

  columnNames: string[];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.tableData) {
      this.dataSource = new MatTableDataSource(this.tableData);
      this.columnNames = Object.keys(this.tableData[0]);
      this.columnNames = [...this.columnNames, 'actions']
      console.log(this.columnNames)
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
