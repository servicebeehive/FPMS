import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-table-row',
  templateUrl: './generic-table-row.component.html',
  styleUrls: ['./generic-table-row.component.scss']
})
export class GenericTableRowComponent<T> implements OnInit {

  @Input() row: T
  @Input() columnName: string
  @Input() actionButtons: string[]

  constructor() { }

  ngOnInit(): void {
  }

}
