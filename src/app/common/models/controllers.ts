import { Injectable } from '@angular/core';

@Injectable()
export class Controllers {
    public readonly login = '/api/user/signin';
    public readonly masterdata = 'api/mastermasterdata/getglobalmasterdata'
}
