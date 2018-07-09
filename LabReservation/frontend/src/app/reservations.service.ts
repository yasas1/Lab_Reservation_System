import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private _http:HttpClient) { }

  viewreservations(lab,date){

    return this._http.get('http://127.0.0.1:3000/reservations/viewreservations/'+lab+'/'+date,{
      
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map((res:any)  => res));
  }

  
  checkAvailable(lab,date,stime,etime){

    return this._http.get('http://127.0.0.1:3000/reservations/checkAvailable/'+lab+'/'+date+'/'+stime+'/'+etime,{
      
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map((res:any)  => res));
  }
/*
  countlab(date){
    return this._http.get('http://127.0.0.1:3000/reservations/getlabrescount/'+date,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map((res:any)  => res));
  }*/

}
