import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private _http:HttpClient) { }

  addTraining(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/trainingUsers',data);
  }

 updateTraining(id:number ,data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/trainingUsers/${id}`,data);
  }

  getTrainingList():Observable<any> {
   return this._http.get('http://localhost:3000/trainingUsers')
  }
  
  deleteTraining(id:number):Observable<any>{
    return  this._http.delete(`http://localhost:3000/trainingUsers/${id}`);
  }

}
