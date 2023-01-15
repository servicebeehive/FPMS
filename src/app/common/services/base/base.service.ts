import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class BaseService {

  protected constructor(public httpClient: HttpClient,
    public BaseUrl: string) { }

  public async PostReturn<T, U>(controllerInfo: string, info: T): Promise<U> {
    const requestInfo = JSON.stringify(info);
    return await this.httpClient
      .post<U>(this.BaseUrl + controllerInfo, requestInfo)
      .toPromise();
  }

  public async Post<T, U>(controllerInfo: string, info: T): Promise<U> {
    const requestInfo = JSON.stringify(info);
    return await this.httpClient
      .post<U>(this.BaseUrl + controllerInfo, requestInfo)
      .toPromise();
  }

  public async Get<U>(controllerInfo: string): Promise<U> {
    return await this.httpClient
      .get<U>(this.BaseUrl + controllerInfo)
      .toPromise();
  }

  public async GetWithValue<U>(controllerInfo: string, Value: number): Promise<U> {
    return await this.httpClient
      .get<U>(this.BaseUrl + controllerInfo + `/${Value}`)
      .toPromise();
  }

  public async Put<T, U>(controllerInfo: string, info: T): Promise<U> {
    const requestInfo = JSON.stringify(info);
    return await this.httpClient
      .put<U>(this.BaseUrl + controllerInfo, requestInfo)
      .toPromise();
  }

  public async Delete<U>(controllerInfo: string, RowId: number): Promise<U> {
    return await this.httpClient
      .delete<U>(this.BaseUrl + controllerInfo + `?Id=${RowId}`)
      .toPromise();
  }

}


