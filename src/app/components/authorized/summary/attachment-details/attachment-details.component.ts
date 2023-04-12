import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ReturnResult } from 'src/app/common/models/return-result';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { getProjectDocumentDataModel } from 'src/app/models/project-document-data.model';
import { projectDocumentList } from 'src/app/models/project-document-list.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-attachment-details',
  templateUrl: './attachment-details.component.html',
  styleUrls: ['./attachment-details.component.scss']
})
export class AttachmentDetailsComponent implements OnChanges {

  @Input() projectHeaderID: number;

  constructor(public fb: FormBuilder,
    public projectService: ProjectService,
    public masterDataService: MasterDataService) { }

  public addAttachmentDetails = this.fb.group({
    addAttachmentsRows: this.fb.array([]),
  })

  public projectDocumentListDetails: projectDocumentList[] = [];

  get formControl() {
    return this.addAttachmentDetails.get('addAttachmentsRows') as FormArray;
  }

  public columnToDispaly: string[] = ['date', 'fileName', 'type', 'comment', 'addedBy', 'actions'];

  ngOnChanges(): void {
    this.getAttachmentDocumentDetails();
  }

  public onFileSelect(input: HTMLInputElement) {
    if (input.files.length > 0) {
      console.log(input.files[0])
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

}
