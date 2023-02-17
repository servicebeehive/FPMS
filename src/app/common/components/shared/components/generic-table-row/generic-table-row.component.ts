import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tableActionData } from 'src/app/common/models/table-action-data.model';

@Component({
  selector: 'app-generic-table-row',
  templateUrl: './generic-table-row.component.html',
  styleUrls: ['./generic-table-row.component.scss']
})
export class GenericTableRowComponent<T> implements OnInit {

  @Input() row: T;
  @Input() columnName: string;
  @Input() actionButtons: string[];

  @Output() actionButtonClick = new EventEmitter<tableActionData<T>>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickActionButton(actionType: string) {
    const data: tableActionData<T> = { data: this.row, actionType: actionType };
    this.actionButtonClick.emit(data);
  }

}
