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

  OverlapMsg:string[]=["Overlaping Reservations"];
  overlap:boolean=false;

  getlabAreservations(){
    this.dis=false;
    this.disp=false;
     
    this._labreservations.resyour(this.username,this.date)
      .subscribe(
        data=>{this.res=data;
          if(this.res.length>0){
            this.dis=true;
            //console.log(this.res[1].lab);
            this.overlap=false;
            var i:number;
            var j:number;
            var stime;
            var etime;
            
            for(j=0; j<this.res.length ;j++) {
              //console.log(this.res[num].lab);
              stime=this.res[j].stime;
              etime=this.res[j].etime;
              for(i=j+1; i<this.res.length ;i++){
                  if(this.res[i].stime == stime){
                    //return res.json({ available: false, message: 'Lab is not available' });
                    this.overlap=true;
                    //console.log("Reservations are Overlapping 1 Lab "+this.res[j].lab+" "+stime+"-"+etime+ " and "+ this.res[i].lab+" "+this.res[i].stime+"-"+this.res[i].etime);
                    this.OverlapMsg.push(" Lab "+this.res[j].lab+" "+stime+"-"+etime+ " and "+ this.res[i].lab+" "+this.res[i].stime+"-"+this.res[i].etime ); //[i-1]
                  }
                  //db st 8-10 and req st 9
                  else if(this.res[i].stime < stime && this.res[i].etime > stime){
                    //return res.json({ available: false, message: 'Lab is not available' });
                    this.overlap=true;
                    console.log("Reservations are Overlapping 2 Lab "+this.res[j].lab+" "+stime+"-"+etime+ " and "+ this.res[i].lab+" "+this.res[i].stime+"-"+this.res[i].etime);
                    this.OverlapMsg.push(" Lab "+this.res[j].lab+" "+stime+"-"+etime+ " and "+ this.res[i].lab+" "+this.res[i].stime+"-"+this.res[i].etime );
                  }//db st 8-10 and req st 7-9 or 7-11
                  else if(this.res[i].stime > stime && this.res[i].stime < etime){
                    //return res.json({ available: false, message: 'Lab is not available' });
                    this.overlap=true;
                    console.log("Reservations are Overlapping 3 Lab "+this.res[j].lab+" "+stime+"-"+etime+ " and "+ this.res[i].lab+" "+this.res[i].stime+"-"+this.res[i].etime);
                    //this.OverlapMsg[i-1]="Reservations are Overlapping Lab ";
                    this.OverlapMsg.push(" Lab "+this.res[j].lab+" "+stime+"-"+etime+ " and "+ this.res[i].lab+" "+this.res[i].stime+"-"+this.res[i].etime );
                  }
                  else{
                    //return res.json({ available: true, message: 'Lab is available' });
                    this.overlap=false;
                    //console.log("Reservations are not Overlapping");
                  }
              }
              
            }
            console.log(this.OverlapMsg);
                       
          }else{
            this.disp=true;
          }
        },//console.log(this.resA)
        error=>console.error(error)
    );
  }

}
