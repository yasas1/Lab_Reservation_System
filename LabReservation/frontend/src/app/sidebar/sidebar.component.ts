import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  username:string='';
  admin:boolean=false;
  position:{};
  

  constructor(private _user:UserService, private _router:Router) { 
    this._user.user()
    .subscribe(
      data=>{this.addName(data);this.checkposition();},
      error=>this._router.navigate(['/login'])
    );

    

  }

  sidebar(){
    document.getElementById('sidebar').classList.toggle('active');
    
  }

  addName(data){
    this.username = data.username;
  }

  ngOnInit() {  

    
  }

  checkposition(){
    
    this._user.checkposition(this.username)
      .subscribe(
        data=>{console.log(data);this.position=data;console.log(this.position[0].position);
          if(this.position[0].position == "admin"){
            this.admin=true;
          }
        },
        error=>console.error(error)
    );

  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/login'])},
      error=>console.log(error)
    )
  }

  moveToProfile(){
    this._router.navigate(['/profile']);
  }

  moveToNewReservation(){
    this._router.navigate(['/doReservation']);
  }

  moveToViewReservation(){
    this._router.navigate(['/viewreservation']);
  }

  moveToHome(){
    this._router.navigate(['/user']);
  }

}
