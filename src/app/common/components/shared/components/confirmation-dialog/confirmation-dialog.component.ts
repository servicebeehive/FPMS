import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { confirmationDialogModel } from 'src/app/common/models/confirmation-dialog-data.model';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  public dialogAction = ActionTypes;
  action: ActionTypes;

  constructor(public matDialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: confirmationDialogModel
  ) { this.action = data.action; }

  ngOnInit(): void {
  }

  onClickConfirm() {
    this.matDialogRef.close(true);
  }

  onClickCancel() {
    this.matDialogRef.close(false);
  }

}
