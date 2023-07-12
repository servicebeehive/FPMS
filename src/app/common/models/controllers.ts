import { Injectable } from '@angular/core';

@Injectable()
export class Controllers {
    public readonly login = '/api/user/signin';
    public readonly masterdata = '/api/mastermasterdata/getglobalmasterdata';
    public readonly getprojectheadlist = '/api/projecthead/getprojectheadlist';
    public readonly createProjectHeader = '/api/projecthead/createprojectheader';
    public readonly createprojectcomponent = '/api/projectcomponent/createprojectcomponent';
    public readonly getprojectcomponentdetailbyyear = '/api/projectcomponent/getprojectcomponentdetailbyyear';
    public readonly getprojectinfodetails = '/api/projecthead/getprojectinfodetails';
    public readonly postsubmitproject = '/api/projecthead/postsubmitproject';
    public readonly projectsummarydata = '/api/projectsummary/projectsummarydata';
    public readonly getprojectdocumentoperation = '/api/projectsummary/getprojectdocumentoperation';
    public readonly getprojectuploadapprovalfile = '/api/projectsummary/getprojectuploadapprovalfile';
    public readonly workflowtaskoperation = '/api/projectsummary/workflowtaskoperation';
    public readonly getstateprojectdata = '/api/stateproject/getstateprojectdata';
    public readonly getstateprojecttskdata = '/api/stateproject/getstateprojecttskdata';
    public readonly createstateproject = '/api/stateproject/createstateproject';
    public readonly getprojectheaderdata='/api/stateproject/getprojectheaderdata'
}
