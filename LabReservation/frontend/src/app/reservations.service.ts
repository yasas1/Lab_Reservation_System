import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private _http:HttpClient) { }

  labAreservations(){
    return this._http.get('http://127.0.0.1:3000/reservations/labAreservation',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(map((res:any)  => res));
  }
}
