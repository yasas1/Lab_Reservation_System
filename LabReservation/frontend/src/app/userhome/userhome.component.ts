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

  username:string;

  today=new Date();            // today date
  
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  
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

  date:Date =new Date("2018-06-18");

  count:any={};  

  countA:number=0;
  countB:number=0;
  countC:number=0;
  countD:number=0;

  nores:boolean=false;

  getlabrescount(){ // set today date for get todat toISOString()

    console.log(this.formatDate(this.today)); //.toISOString()

    this._labreservations.countlab(this.formatDate(this.today))
      .subscribe(
        data=>{this.count=data; //console.log(this.count[0]);
          if(this.count==null){
            this.nores=true;
            //return;           
          }
          else if(this.count.length==0){
            this.nores=true;
            //return;            
          }
          else{
            if(this.count[0] != null){
              if(this.count[0]._id == "A"){
                this.countA=this.count[0].total;
              }else if(this.count[0]._id == "B"){
                this.countB=this.count[0].total;
              }else if(this.count[0]._id == "C"){
                this.countC=this.count[0].total;
              }else{
                this.countD=this.count[0].total;
              }
              
            } 
            if(this.count[1] != null){
              if(this.count[1]._id == "B"){
                this.countB=this.count[1].total;
              }else if(this.count[1]._id == "C"){
                this.countC=this.count[1].total;
              }else{
                this.countD=this.count[1].total;
              }
            }
            if(this.count[2] != null){
              if(this.count[2]._id == "C"){
                this.countC=this.count[2].total;
              }else{
                this.countD=this.count[2].total;
              }
            }
            if(this.count[3] != null){
              this.countD=this.count[3].total;
            }                           
            //console.log(this.countC);
            this.barchar();
            //this.nores=false;
          }
          this.countA=0;
          this.countB=0;
          this.countC=0;
          this.countD=0;
          
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
    this._labreservations.viewreservations(lab,this.formatDate(this.today))
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
