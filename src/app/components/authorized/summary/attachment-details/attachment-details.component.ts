import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/common/components/shared/components/confirmation-dialog/confirmation-dialog.component';
import { confirmationDialogModel } from 'src/app/common/models/confirmation-dialog-data.model';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { ReturnResult } from 'src/app/common/models/return-result';
import { tableActionData } from 'src/app/common/models/table-action-data.model';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { getProjectDocumentDataModel } from 'src/app/models/project-document-data.model';
import { projectDocumentList } from 'src/app/models/project-document-list.model';
import { projectWorkFlow } from 'src/app/models/projectworkflow-details.model';
import { workFlowOperation } from 'src/app/models/work-flow.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-attachment-details',
  templateUrl: './attachment-details.component.html',
  styleUrls: ['./attachment-details.component.scss']
})
export class AttachmentDetailsComponent implements OnChanges {

  @Input() projectHeaderID: number;
  @Input() projectWorkflow: projectWorkFlow[];
  @Output() actionItemClicked = new EventEmitter<boolean>();

  constructor(public fb: FormBuilder,
    public projectService: ProjectService,
    public masterDataService: MasterDataService,
    public notificationService: NotificationService<any>,
    public dialog: MatDialog) {
  }

  public addAttachmentDetails = this.fb.group({
    addAttachmentsRows: this.fb.array([]),
  })

  public projectDocumentListDetails: projectDocumentList[] = [];

  get formControl() {
    return this.addAttachmentDetails.get('addAttachmentsRows') as FormArray;
  }

  public columnToDispaly: string[] = ['status', 'assignee', 'completedby', 'completedon', 'actions'];

  public actionButtons = ['approve', 'reject']

  ngOnChanges(): void {
    this.getAttachmentDocumentDetails();
  }

  public onFileSelect(event) {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      const data = {
        projectheadid: this.projectHeaderID
      }
      formData.append('approval_file', event.target.files[0], event.target.files[0].fileName);
      this.projectService.getProjectUploadApprovalFile(data, formData).then((res: ReturnResult<any>) => {
        if (res.success) {
          this.getAttachmentDocumentDetails();
        }
        this.notificationService.showNotification(res);
      })
    }
  }

  public getAttachmentDocumentDetails() {
    if (this.projectHeaderID) {
      const attachmentDetails: getProjectDocumentDataModel = {
        projectheadid: this.projectHeaderID,
        projectxdocumentid: null,
        documenttypecode: null,
        operationtype: "LIST"
      }
      this.projectService.getProjectDocumentOperation(attachmentDetails).then((res: ReturnResult<projectDocumentList[]>) => {
        if (res.success) {
          this.projectDocumentListDetails = res.data;
          this.addAttachmentRows();
        }
      })
    }
  }

  public addAttachmentRows() {
    if (this.projectDocumentListDetails.length > 0) {
      this.formControl.clear();
      this.projectDocumentListDetails.forEach((element, i) => {
        this.formControl.push(this.fb.group({
          projectxdocumentid: [element.projectxdocumentid],
          projectheadid: [element.projectheadid],
          updatetime: [element.updatetime],
          documentname: [element.documentname],
          documenttypecode: [element.documenttypecode],
          documentpath: [element.documentpath],
          uploadedby: [element.uploadedby],
          index: [i]
        }))
      })
    }
  }

  public onClickSave(value: projectDocumentList) {
    this.openDialog('Save', 'Are you sure you want to Save ?', ActionTypes.save).then((confirmationDialog: boolean) => {
      if (confirmationDialog) {
        const attachmentDetails: getProjectDocumentDataModel = {
          projectheadid: value.projectheadid,
          projectxdocumentid: value.projectxdocumentid,
          documenttypecode: value.documenttypecode,
          operationtype: "UPDATE"
        }
        this.projectService.getProjectDocumentOperation(attachmentDetails).then((res: ReturnResult<projectDocumentList[]>) => {
          if (res.success) {
            this.getAttachmentDocumentDetails();
          }
          this.notificationService.showNotification(res);
        })
      }
    });
  }

  public onClickDownload(value: projectDocumentList) {
  }

  public onClickCancel(value: projectDocumentList) {
    this.openDialog('Delete', 'Are you sure you want to Delete ?', ActionTypes.delete).then((confirmationDialog: boolean) => {
      if (confirmationDialog) {
        const attachmentDetails: getProjectDocumentDataModel = {
          projectheadid: value.projectheadid,
          projectxdocumentid: value.projectxdocumentid,
          documenttypecode: value.documenttypecode,
          operationtype: "DELETE"
        }
        this.projectService.getProjectDocumentOperation(attachmentDetails).then((res: ReturnResult<projectDocumentList[]>) => {
          if (res.success) {
            this.getAttachmentDocumentDetails();
          }
          this.notificationService.showNotification(res);
        })
      }
    })
  }

  public onGetActionItem(actionItem: tableActionData<projectWorkFlow>) {
    const { actionType, data } = actionItem;
    const actionTitle = actionType === 'approve' ? "Approve" : "Reject"
    const message = `Are you sure you want to ${actionTitle} ?`
    this.openDialog(actionTitle, message, ActionTypes.submit).then((confirmationDialog: boolean) => {
      if (confirmationDialog) {
        const apiCallBody: workFlowOperation = {
          "projectxworkflowapprovalid": data.projectxworkflowapprovalid,
          "status": actionType === 'approve' ? "A" : "R"
        }
        this.projectService.workFlowTaskOperation(apiCallBody).then((res: ReturnResult<any>) => {
          if (res.success) {
            this.actionItemClicked.emit(true);
          }
          this.notificationService.showNotification(res);
        })
      }
    })
  }

  openDialog(actionTitleStr: string, messageStr: string, actionStr: ActionTypes): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const dialogData: confirmationDialogModel = {
        actionTitle: actionTitleStr,
        message: messageStr,
        action: actionStr
      }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = dialogData;
      const dialogRef = this.dialog.open
        (ConfirmationDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((res: boolean) => {
        resolve(res);
      })
    })

  }

}
