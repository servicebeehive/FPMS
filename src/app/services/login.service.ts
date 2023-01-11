import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controllers } from '../common/models/controllers';
import { ConfigService } from '../common/services/config/config.service';
import { IConfig } from '../common/models/iconfig';
import { BaseService } from '../common/services/base/base.service';
import { userDetails } from '../models/user-details.model';
import { ReturnResult } from '../common/models/return-result';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(public http: HttpClient,
    public controllers: Controllers,
    public config: ConfigService<IConfig>) {
    super(http, config.getSettingsObject().APIUrl)
  }

  public loginUser(userLoginDetails: userDetails): Promise<ReturnResult<userDetails>> {
    return this.PostReturn<userDetails, ReturnResult>(this.controllers.login, userLoginDetails);
  }
}
