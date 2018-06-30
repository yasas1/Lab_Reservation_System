import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _user:UserService, private _router:Router) { }

  sidebar(){
    document.getElementById('sidebar').classList.toggle('active');
  }

  ngOnInit() {
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{//console.log(data);
        this._router.navigate(['/login']);
    },
      error=>console.log(error)
    )
  }

  moveToProfile(){
    this._router.navigate(['/profile']);
  }

  moveToNewReservation(){
    this._router.navigate(['/doReservation']);
  }

  moveToHome(){
    this._router.navigate(['/user']);
  }

}
