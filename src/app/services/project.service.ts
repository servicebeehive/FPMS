import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controllers } from '../common/models/controllers';
import { IConfig } from '../common/models/iconfig';
import { ReturnResult } from '../common/models/return-result';
import { BaseService } from '../common/services/base/base.service';
import { ConfigService } from '../common/services/config/config.service';
import { createProjectComponent } from '../models/create-project-component.model';
import { editProjectDetails } from '../models/edit-project-details.model';
import { finalProjectSubmission } from '../models/final-project-submission.model';
import { projectComponentDetails } from '../models/project-component-details.model';
import { projectDetails } from '../models/project-details.model';
import { projectHeaderDetails } from '../models/projectheader.model';
import { summaryDeatils } from '../models/summary-details.model';
import { projectDocumentList } from '../models/project-document-list.model';
import { getProjectDocumentDataModel } from '../models/project-document-data.model';
import { Observable } from 'rxjs';
import { workFlowOperation } from '../models/work-flow.model';
import { stateCategoryData, stateCategoryDetails, stateProjectWorkDetails } from '../models/state-category.model';
import { statePerHecDataDetails } from '../models/state-per-hec-details.model';
import { stateProjectSubmission } from '../models/state-project-submission.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  constructor(public http: HttpClient,
    public controller: Controllers,
    public baseUrl: ConfigService<IConfig>) {
    super(http, baseUrl.getSettingsObject().APIUrl)
  }

  public async getProjectList(): Promise<ReturnResult<projectDetails[]>> {
    return this.Get<ReturnResult<projectDetails[]>>(this.controller.getprojectheadlist)
  }

  public insertProjectDetails(projectDeatils: projectHeaderDetails): Promise<ReturnResult<[{ id: number }]>> {
    return this.PostReturn<projectHeaderDetails, ReturnResult>(this.controller.createProjectHeader, projectDeatils);
  }

  public createProjectComponent(createProjectComponentData: createProjectComponent): Promise<ReturnResult<any>> {
    return this.PostReturn<createProjectComponent, ReturnResult<any>>(this.controller.createprojectcomponent, createProjectComponentData)
  }

  public getProjectComponentDetailsBYYear(data: { projectheadid: number, projectcomponentyear: string }): Promise<ReturnResult<projectComponentDetails>> {
    return this.GetWithHeaders<ReturnResult<projectComponentDetails>, { projectheadid: number, projectcomponentyear: string }>(this.controller.getprojectcomponentdetailbyyear, data)
  }

  public getProjectInfoDetails(data: { projectheadid: number }): Promise<ReturnResult<editProjectDetails>> {
    return this.GetWithHeaders<ReturnResult<editProjectDetails>, { projectheadid: number }>(this.controller.getprojectinfodetails, data)
  }

  public finalSubmitProject(finalSubmitProjectData: finalProjectSubmission): Promise<ReturnResult<any>> {
    return this.PostReturn<finalProjectSubmission, ReturnResult<any>>(this.controller.postsubmitproject, finalSubmitProjectData)
  }

  public getProjectSummaryData(data: { projectheadid: number }): Promise<ReturnResult<summaryDeatils>> {
    return this.GetWithHeaders<ReturnResult<summaryDeatils>, { projectheadid: number }>(this.controller.projectsummarydata, data)
  }

  public getStateProjectData(data: { statetaskcategoryid: number }): Promise<ReturnResult<stateCategoryDetails>> {
    return this.GetWithHeaders<ReturnResult<stateCategoryDetails>, { statetaskcategoryid: number }>(this.controller.getstateprojectdata, data)
  }

  public getStateProjectWorkData(data: { statetaskcategoryid: number }): Promise<ReturnResult<stateProjectWorkDetails>> {
    return this.GetWithHeaders<ReturnResult<stateProjectWorkDetails>, { statetaskcategoryid: number }>(this.controller.getstateprojectdata, data)
  }

  public getStateProjectComponentData(data: { statetaskid: number, totalarea: string }): Promise<ReturnResult<statePerHecDataDetails>> {
    return this.GetWithHeaders<ReturnResult<statePerHecDataDetails>, { statetaskid: number, totalarea: string }>(this.controller.getstateprojecttskdata, data)
  }

  public getProjectDocumentOperation(getProjectDocumentData: getProjectDocumentDataModel): Promise<ReturnResult<projectDocumentList[]>> {
    return this.PostReturn<getProjectDocumentDataModel, ReturnResult<projectDocumentList[]>>(this.controller.getprojectdocumentoperation, getProjectDocumentData)
  }

  public getProjectUploadApprovalFile(data: { projectheadid: number }, fileUploadData: FormData): Promise<ReturnResult<any>> {
    return this.PostWithFormData<{
      projectheadid: number;
    }, ReturnResult<any>>(this.controller.getprojectuploadapprovalfile, data, fileUploadData)
  }

  public workFlowTaskOperation(workFlowOperationData: workFlowOperation): Promise<ReturnResult<any>> {
    return this.PostReturn<workFlowOperation, ReturnResult<any>>(this.controller.workflowtaskoperation, workFlowOperationData)
  }

  public stateProjectCreation(stateProjectCreationData: projectHeaderDetails): Promise<ReturnResult<stateProjectSubmission[]>> {
    return this.PostReturn<projectHeaderDetails, ReturnResult<stateProjectSubmission[]>>(this.controller.createstateproject, stateProjectCreationData)
  }

  public getStateProjectInfoDetails(data: { projectheadid: number }): Promise<ReturnResult<statePerHecDataDetails>> {
    return this.GetWithHeaders<ReturnResult<statePerHecDataDetails>, { projectheadid: number }>(this.controller.getprojectheaderdata, data)
  }
}
