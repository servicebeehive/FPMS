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

  public async PostWithFormData<T, U>(controllerInfo: string, info: T, formData: FormData): Promise<U> {
    const requestInfo = JSON.stringify(info);
    return await this.httpClient
      .post<U>(this.BaseUrl + controllerInfo, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'data': requestInfo
        }
      })
      .toPromise();
  }

  public async Get<U>(controllerInfo: string): Promise<U> {
    return await this.httpClient
      .get<U>(this.BaseUrl + controllerInfo)
      .toPromise();
  }

  public async GetWithValue<U, T>(controllerInfo: string, Value: T): Promise<U> {
    return await this.httpClient
      .get<U>(this.BaseUrl + controllerInfo + `/${Value}`)
      .toPromise();
  }

  public async GetWithHeaders<U, T>(controllerInfo: string, Value?: T): Promise<U> {
    const value = JSON.stringify(Value)
    return await this.httpClient
      .get<U>(this.BaseUrl + controllerInfo, { headers: new HttpHeaders().set('data', value) })
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


