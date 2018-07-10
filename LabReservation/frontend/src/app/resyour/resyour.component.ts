import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Labreservation } from '../labreservation';
import { ReservationsService } from '../reservations.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-resyour',
  templateUrl: './resyour.component.html',
  styleUrls: ['./resyour.component.css']
})
export class ResyourComponent implements OnInit {

  username:string='';

  constructor(private _user:UserService, private _router:Router,private _labreservations:ReservationsService) {
    this._user.user()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    );
   }

   viewresForm:FormGroup = new FormGroup({
    
    date: new FormControl(null,Validators.required)
    
  });

  addName(data){
    this.username = data.username;
  }

  ngOnInit() {
  }

  date:Date;
  res:Labreservation[];
  dis:boolean;

  getlabAreservations(){

    this.dis=false;
    
    
    this._labreservations.resyour(this.username,this.date)
      .subscribe(
        data=>{this.res=data;
          if(this.res.length>0){
            this.dis=true;
          }
        },//console.log(this.resA)
        error=>console.error(error)
    );
  }

}
