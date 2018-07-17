import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoreservationService } from '../doreservation.service';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-do-reservation',
  templateUrl: './do-reservation.component.html',
  styleUrls: ['./do-reservation.component.css']
})
export class DoReservationComponent implements OnInit {

  username:string='';

  msg:string="";
  msgstate:boolean=false;
  success:boolean=false;
  today=new Date();

  date:Date;

  doresForm:FormGroup = new FormGroup({
    username: new FormControl(null,Validators.required),
    lab: new FormControl(null,Validators.required),
    date: new FormControl(null,Validators.required),
    stime: new FormControl(null,Validators.required),
    etime: new FormControl(null,Validators.required),
    
  });

  constructor(private _user:UserService,private _router:Router, private _reserve:DoreservationService) {
    this._user.user()
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    )
  }

  addName(data){
    this.username = data.username;
  }

  ngOnInit() {
  }

  dateChange(){

    var dd = new Date(this.date);
    console.log(dd.getMonth());

    if(dd.getMonth() <= this.today.getMonth() && dd.getDate() < this.today.getDate()){
      console.log("check");
      
    }
  }

  availbelMsg:any={};

  doreservation(){

    /*if(!this.registrationFormGroup.valid || (this.registrationFormGroup.controls.password.value != this.registrationFormGroup.controls.cpass.value)){
      console.log("Invalid Form"); return;
    }*/
    this.msgstate=false;
    this.success=false;

    this._reserve.doReservation(JSON.stringify(this.doresForm.value))
    .subscribe(
      data=>{console.log(data);
        this.availbelMsg=data;
        console.log(this.availbelMsg.message);
        
        if(this.availbelMsg.available==false){
          this.msgstate=true;
          this.msg="Lab is not Available";
        }
        else if(this.availbelMsg.otherlab==true){
          this.msgstate=true;
          this.msg=this.availbelMsg.message;
          console.log(this.msg);
        }else{
          this.success=true;
          this.msg="Reservation Success";
        }
        
      },
      error=>console.error(error)
    )
    //console.log(JSON.stringify(this.registerForm.value));
  }

}
