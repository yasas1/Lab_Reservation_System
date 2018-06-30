import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ReservationsService } from '../reservations.service';
import { Labreservation } from '../labreservation';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  username:string='';
  today=new Date()  ;
  labA:boolean=false;

  reser: Labreservation[];

  constructor(private _user:UserService, private _router:Router,private _labreservations:ReservationsService) { 
    this._user.user()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    );

    this.getlabAreservations();
  }

  addName(data){
    this.username = data.username;
  }

  ngOnInit() {
  }

  getlabAreservations(){
    this._labreservations.labAreservations()
      .subscribe(
        data=>{this.reser=data;},
        error=>console.error(error)
    );

  }

  showLabA(){
    this.labA=true;
    
  }
  hideLabA(){
    this.labA=false;
  }

}
