import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IActivity } from '../Models/IActivities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getActivity(activityID: string):Observable<IActivity> {
    return this.http.get<IActivity>(API + '/id/' + activityID);
  }

  getAllActivities():Observable<IActivity[]> {
    return this.http.get<IActivity[]>(API);
  }

  markAsFavorite(id:string){
    
  }
}

const API = 'https://orangevalleycaa.org/api/videos';
