import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Associate } from '../model/associate.model';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000';

  UploadExcel(formData: FormData) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(this.url + '/UploadExcel', formData, httpOptions);
  }
  // getTrainingList(): Observable<any> {
  //  return this.http.post(this.url + '/UploadExcel', formData, httpOptions);
  // }
  BindUser(): Observable<Associate[]> {
    return this.http.get<Associate[]>(this.url + '/AssociateDetails');
  }
}
