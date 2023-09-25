import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controllers } from '../common/models/controllers';
import { IConfig } from '../common/models/iconfig';
import { ReturnResult } from '../common/models/return-result';
import { ConfigService } from '../common/services/config/config.service';
import { projectHeaderDetails } from '../models/projectheader.model';
import { BaseService } from '../common/services/base/base.service';
import { laborDetails } from '../models/labor-details.model';

@Injectable({
  providedIn: 'root'
})
export class LaborService  extends BaseService{
  [x: string]: any;

  constructor(public http: HttpClient,
    public controller: Controllers,
    public baseUrl: ConfigService<IConfig>) {
    super(http, baseUrl.getSettingsObject().APIUrl)  }
    public createlobarrate(laborDetailsoption:laborDetails): Promise<ReturnResult<laborDetails>> {
      console.log(laborDetailsoption)
      return this.PostReturn<laborDetails, ReturnResult>(this.controller.labouroperation, laborDetailsoption)
    }
   
}
