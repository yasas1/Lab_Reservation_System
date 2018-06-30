import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoreservationService {

  constructor( private _http:HttpClient) { }

  doReservation(body:any){
    return this._http.post('http://127.0.0.1:3000/reservations/doReservation',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

}