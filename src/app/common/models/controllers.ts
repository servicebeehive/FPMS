import { Injectable } from '@angular/core';

@Injectable()
export class Controllers {
    public readonly login = '/api/user/signin';
    public readonly masterdata = '/api/mastermasterdata/getglobalmasterdata';
    public readonly getprojectheadlist = '/api/projecthead/getprojectheadlist'
    public readonly createProjectHeader = '/api/projecthead/createprojectheader'
}
