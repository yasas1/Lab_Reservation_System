import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ReservationsService } from '../reservations.service';
import { Labreservation } from '../labreservation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  username:string='';
  today=new Date()  ;
  labA:boolean=false;

  lab:string="A";

  reser: Labreservation[];

  

  constructor(private _user:UserService, private _router:Router,private _labreservations:ReservationsService) { 
    this._user.user()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    );
    
  }

  viewresForm:FormGroup = new FormGroup({  
    lab: new FormControl(null,Validators.required), 
  });

  addName(data){
    this.username = data.username;
  }

  ngOnInit() {
    this.getlabAreservations(this.lab);
    this.getlabrescount();
    
   
  }

  countdate:Date =new Date("2018-06-18");
  count:any={};  

  countA:number=0;
  countB:number=0;
  countC:number=0;
  countD:number=0;

  getlabrescount(date=this.countdate){
    this._labreservations.countlab(date)
      .subscribe(
        data=>{this.count=data; console.error(this.count[0]);
          this.countA=this.count[0].total;
          this.countB=this.count[1].total;
          this.countC=this.count[2].total;
          this.countD=this.count[3].total;
          
          console.error(this.countC);
          this.barchar();
        },
        error=>console.error(error)
    );
    

  }

  barchar(){
   
    new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        
        labels: ["Lab A", "Lab B", "Lab C", "Lab D"],
        datasets: [
          {
            label: "Reserve ",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
            data: [this.countA,this.countB,this.countC,this.countD],
            scaleStepWidth:1
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Lab Reservations '
        },
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero:true,
              stepSize: 1
            },
            scaleLabel: {
              display: true,
              labelString: "Reservation Count",
              fontColor: "red"
            }
          }]
        }
      }
  });
  }

  getlabAreservations(lab=this.lab){
    this._labreservations.labAreservations(lab)
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
