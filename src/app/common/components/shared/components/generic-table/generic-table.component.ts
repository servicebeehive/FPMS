import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  data = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 21, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 31, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 41, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 51, name: 'Boron', weight: 10.811, symbol: 'B' },
  ];

  dataSource = new MatTableDataSource(this.data);

  columnNames = Object.keys(this.data[0]);

  actionButtons: string[] = ['Add', 'Edit', 'Delete']

  constructor() { }

  ngOnInit(): void {
    this.columnNames = [...this.columnNames, 'actions']
    console.log(this.columnNames)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

}
