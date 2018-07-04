import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';
import { Router } from '@angular/router';
import { Labreservation } from '../labreservation';
import { UserService } from '../user.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  username:string='';

  constructor(private _user:UserService,private _router:Router,private _labreservations:ReservationsService) {
    this._user.user()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    );
  }

  addName(data){
    this.username = data.username;
  }

  viewresForm:FormGroup = new FormGroup({
    
    lab: new FormControl(null,Validators.required),
    date: new FormControl(null,Validators.required)
    
  });

  today:Date=new Date("2018-06-18");
  ngOnInit() {
  
    this.viewreservation("A",this.today);
  }

  lab:string="A";
  date:Date;//=new Date("2018-06-18");
  reser: Labreservation[];

  viewreservation(lab=this.lab,date=this.date){
    
    this._labreservations.viewreservations(lab,date)
      .subscribe(
        data=>{console.log(data); console.log(this.date);this.reser=data;},
        error=>console.error(error)
    );

  }

}
