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
  disp:boolean;

  OverlapMsg:string;

  getlabAreservations(){
    this.dis=false;
    this.disp=false;
     
    this._labreservations.resyour(this.username,this.date)
      .subscribe(
        data=>{this.res=data;
          if(this.res.length>0){
            this.dis=true;
            //console.log(this.res[1].lab);
            var i:number;
            var stime=this.res[0].stime;
            var etime=this.res[0].etime;
            for(i=1; i<this.res.length ;i++) {
              //console.log(this.res[num].lab);

              if(this.res[i].stime == stime){
                //return res.json({ available: false, message: 'Lab is not available' });
                console.log("Reservations are Overlapping 1 Lab "+this.res[0].lab+" "+stime+"-"+etime+ " and "+ this.res[i].lab+" "+this.res[i].stime+"-"+this.res[i].etime);
              }
              //db st 8-10 and req st 9
              else if(this.res[i].stime < stime && this.res[i].etime > stime){
                //return res.json({ available: false, message: 'Lab is not available' });
                console.log("Reservations are Overlapping 2 Lab "+this.res[0].lab+" "+stime+"-"+etime+ " and "+ this.res[i].lab+" "+this.res[i].stime+"-"+this.res[i].etime);
              }//db st 8-10 and req st 7-9 or 7-11
              else if(this.res[i].stime > stime && this.res[i].stime < etime){
                //return res.json({ available: false, message: 'Lab is not available' });
                console.log("Reservations are Overlapping 3 Lab "+this.res[0].lab+" "+stime+"-"+etime+ " and "+ this.res[i].lab+" "+this.res[i].stime+"-"+this.res[i].etime);
              }
              else{
                //return res.json({ available: true, message: 'Lab is available' });
                console.log("Reservations are not Overlapping");
              }
            }
                       
          }else{
            this.disp=true;
          }
        },//console.log(this.resA)
        error=>console.error(error)
    );
  }

}
