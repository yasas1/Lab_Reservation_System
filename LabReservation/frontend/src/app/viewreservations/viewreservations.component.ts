import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';
import { Labreservation } from '../labreservation';
import { Time } from '@angular/common';

@Component({
  selector: 'app-viewreservations',
  templateUrl: './viewreservations.component.html',
  styleUrls: ['./viewreservations.component.css']
})
export class ViewreservationsComponent implements OnInit {

  constructor(private _labreservations:ReservationsService) { }

  viewresForm:FormGroup = new FormGroup({
    
    lab: new FormControl(null,Validators.required),
    date: new FormControl(null,Validators.required)
    
  });

  today:Date=new Date("2018-06-18");
  ngOnInit() {
  
    this.viewreservation("A",this.today);
  }

  lab:string="A";
  date:Date=new Date("2018-06-18");
  reser: Labreservation[];

  viewreservation(lab=this.lab,date=this.date){
    
    this._labreservations.viewreservations(lab,date)
      .subscribe(
        data=>{console.log(data); console.log(this.date);this.reser=data;},
        error=>console.error(error)
    );

  }

  checkAvailableForm:FormGroup = new FormGroup({
    
    lab: new FormControl(null,Validators.required),
    cadate: new FormControl(null,Validators.required),
    stime: new FormControl(null,Validators.required),
    etime: new FormControl(null,Validators.required)
    
  });

  clab:string="A";
  cdate:Date=new Date("2018-06-18");
  stime:Time;
  etime:Time;
  availbelMsg:any={};
  msgbox:boolean=false;

  checkAvailable(lab=this.clab,date=this.cdate,stime=this.stime,etime=this.etime){
    console.log(this.stime);
    console.log(this.etime);
    console.log(this.cdate);
    console.log(this.clab);

    this._labreservations.checkAvailable(lab,date,stime,etime)
      .subscribe(
        data=>{
          this.msgbox=true;
          this.availbelMsg=data;
          //console.log(this.availbelMsg.message);
          //console.log(this.stime);
        },
        error=>console.error(error)
    );
  }

}
