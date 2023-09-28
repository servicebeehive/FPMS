import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controllers } from '../../models/controllers';
import { IConfig } from '../../models/iconfig';
import { masterData } from '../../models/master-data.model';
import { ReturnResult } from '../../models/return-result';
import { BaseService } from '../base/base.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService extends BaseService {

  public globalMasterData: masterData

  constructor(public http: HttpClient,
    public controllers: Controllers,
    public config: ConfigService<IConfig>) {
    // let item='http://localhost:1610'
       let item='http://fpmsind.com:1611'
      
    super(http, item)

    //"APIUrl Dev": "http://3.110.148.123:1610"
    //"APIUrl Pord": "http://13.234.115.22:1611"
  }

  getMasterData() {
    this.Get<ReturnResult<masterData>>(this.controllers.masterdata).then(res => {
      if (res.success) {
        this.globalMasterData = res.data;
      }
    })
  }
}
