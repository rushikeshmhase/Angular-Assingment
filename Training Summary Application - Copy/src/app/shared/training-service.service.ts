import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainingDetails } from '../model/training-details';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TrainingServiceService {



  constructor(private httpClient:HttpClient) { }


  

  getTraining(): Observable<TrainingDetails[]>{
    return this.httpClient.get<TrainingDetails[]>('http://localhost:3000/trainingUsers');
  }
}
