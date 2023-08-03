import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { compenentDetails } from 'src/app/models/state-per-hec-details.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReturnResult } from 'src/app/common/models/return-result';
import { CreateStateComponentComponent } from '../create-state-component/create-state-component.component';
import { confirmationDialogModel } from 'src/app/common/models/confirmation-dialog-data.model';
import { ConfirmationDialogComponent } from 'src/app/common/components/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from 'src/app/common/services/notification/notification.service';

@Component({
  selector: 'app-state-project-component-details',
  templateUrl: './state-project-component-details.component.html',
  styleUrls: ['./state-project-component-details.component.scss']
})
export class StateProjectComponentDetailsComponent implements OnChanges {

  @Input() public componentDataDetails: compenentDetails[];
  @Input() public year: string;
  @Output() public onDeletedItem = new EventEmitter<compenentDetails[]>();
  public columnToDispaly: string[] = ['tasksequance', 'taskdesc', 'startdate', 'enddate', 'rate_uom', 'rate', 'maxexpd', 'action'];
  public dataSource: compenentDetails[];
  public actionTypes = ActionTypes;

  constructor(public dialog: MatDialog,
              public notificationService: NotificationService<any>) { }


  ngOnChanges() {
    if (this.componentDataDetails) {
      this.dataSource = this.componentDataDetails;
    }
  }


  onClickEdit(actionType: string, item: compenentDetails) {
    if (actionType === this.actionTypes.delete) {
      this.onDeleteItem(item);
      return;
    }
    const dialogRef = this.dialog.open(CreateStateComponentComponent, {
      data: item,
      disableClose: true,
      panelClass: 'dialog-class'
    });
    dialogRef.afterClosed().subscribe((result: ReturnResult<compenentDetails>) => {
      if (result) {
        const messageNotifier:ReturnResult<any> ={
        data:null,
        message:'Data has been updated, Please click on the Draft/Submit button to save',
        success:true
        }
        this.notificationService.showNotification(messageNotifier);
      }
    })
  }


  public onDeleteItem(item: compenentDetails) {
    const dialogData: confirmationDialogModel = {
      actionTitle: 'Delete',
      message: 'Are you sure you want to delete ?',
      action: ActionTypes.delete
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = dialogData;
    const dialogRef = this.dialog.open
      (ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dialogResult: boolean) => {
      if (dialogResult) {
        const completeData = this.dataSource.filter(value=>value.tasksequance!==item.tasksequance);
        const deletedItem = this.dataSource.filter(value=>value.tasksequance===item.tasksequance);
        this.dataSource = completeData;
        this.onDeletedItem.emit(deletedItem);
        const messageNotifier:ReturnResult<any> ={
          data:null,
          message:'Row has been deleted, Please click on the Draft/Submit button to save',
          success:true
          }
          this.notificationService.showNotification(messageNotifier);
      }
    });
  }

}
