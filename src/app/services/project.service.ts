import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controllers } from '../common/models/controllers';
import { IConfig } from '../common/models/iconfig';
import { ReturnResult } from '../common/models/return-result';
import { BaseService } from '../common/services/base/base.service';
import { ConfigService } from '../common/services/config/config.service';
import { createProjectComponent } from '../models/create-project-component.model';
import { editProjectDetails } from '../models/edit-project-details.model';
import { projectComponentDetails } from '../models/project-component-details.model';
import { projectDetails } from '../models/project-details.model';
import { projectHeaderDetails } from '../models/projectheader.model';

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
}
