import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  setOptions(paramsObj: any, customHeaders: {} | any) {
    const headersObj: any = {
      
      'Authorization': `${localStorage?.getItem("token") || ''}`,
    };
    if (Object.keys(customHeaders).length > 0) {
      Object.keys(customHeaders)
        .forEach(function eachKey(key) {
          headersObj[key] = customHeaders[key];
        });
    }    
    let httpParamsObj = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {        
        httpParamsObj = httpParamsObj.set(key.toString(), paramsObj[key].toString());
      }
    }
    
    return {
      headers: headersObj,
      params: httpParamsObj,
    };
  }

  get(url: string, params: object = {}, customHeaders: {} = {}) {
    return this.http.get<any>(`${environment['host']}${url}`,
      this.setOptions(params, customHeaders));
  }

  post(url: string, body: any = {}, params: object = {}, customHeaders: {} = {}) {
    return this.http.post<any>(`${environment['host']}${url}`,
      body,
      this.setOptions(params, customHeaders));
  }

  put(url: string, body: any, params: object = {}, customHeaders: {} = {}) {
    return this.http.put<any>(`${environment['host']}${url}`,
      body,
      this.setOptions(params, customHeaders), );
  }

  delete(url: string, params: any = {}, customHeaders: {} = {}) {
    return this.http.delete(`${environment['host']}${url}`,
      this.setOptions(params, customHeaders)
    );
  }
}
