import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name:string='';
  username:string='';
  email:string='';

  constructor(private _user:UserService,private _router:Router) {
    this._user.user()
    .subscribe(
      data=>this.addData(data),
      error=>this._router.navigate(['/login'])
    )
   }

  addData(data){
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    
  }

  ngOnInit() {
  }

}
