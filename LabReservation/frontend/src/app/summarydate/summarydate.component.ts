import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Labreservation } from '../labreservation';
import { ReservationsService } from '../reservations.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-summarydate',
  templateUrl: './summarydate.component.html',
  styleUrls: ['./summarydate.component.css']
})
export class SummarydateComponent implements OnInit {

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

  date:Date;// =new Date("2018-06-18");

  resA:Labreservation[];
  resB:Labreservation[];
  resC:Labreservation[];
  resD:Labreservation[];

  disA:boolean;
  disB:boolean;
  disC:boolean;
  disD:boolean;

  getlabAreservations(){

    this.disA=false;
    this.disB=false;
    this.disC=false;
    this.disD=false;
    
    this._labreservations.viewreservations("A",this.date)
      .subscribe(
        data=>{this.resA=data;
          if(this.resA.length>0){
            this.disA=true;
          }
        },//console.log(this.resA)
        error=>console.error(error)
    );

    this._labreservations.viewreservations("B",this.date)
      .subscribe(
        data=>{this.resB=data;
          if(this.resB.length>0){
            this.disB=true;
          }
        },
        error=>console.error(error)
    );

    this._labreservations.viewreservations("C",this.date)
      .subscribe(
        data=>{this.resC=data;//console.log(this.resC.length);
          if(this.resC.length>0){
            this.disC=true;
          }
        },
        error=>console.error(error)
    );

    this._labreservations.viewreservations("D",this.date)
      .subscribe(
        data=>{this.resD=data;
          if(this.resD.length>0){
            this.disD=true;
          }
        },
        error=>console.error(error)
    );

    this.getlabrescount();

  }

  count:any={};  

  countA:number=0;
  countB:number=0;
  countC:number=0;
  countD:number=0;

  nores:boolean=false;
  

  getlabrescount(){
    this.nores=false;
    
    this._labreservations.countlab(this.date)
      .subscribe(
        data=>{this.count=data; console.log(this.count); 
          //this.count[0].length

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
   
    /*new Chart(document.getElementById("bar-chart"), {
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
          }],
          xAxes: [{
            barPercentage: 0.5,
            gridLines: {
              //display: false,
              zeroLineColor: "black",
              zeroLineWidth: 2
            }
          }]
          
        }
      }
  });  */
  
  new Chart(document.getElementById("bar-chart"), {
    type: 'horizontalBar',
    data: {
      labels: ["Lab A", "Lab B", "Lab C", "Lab D"],
      datasets: [
        {
          label: "Reserve",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#c45850"],
          data: [this.countA,this.countB,this.countC,this.countD]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Lab Reservations'
      },
      scales:{
        xAxes:[{
          ticks:{
            beginAtZero:true,
            stepSize: 1
          },
          scaleLabel: {
            display: true,
            labelString: "Reservation Count",
            fontColor: "black"
          }
        }],
      }
    }
});

  }

}
