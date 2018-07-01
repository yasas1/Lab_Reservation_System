import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ProfileComponent } from './profile/profile.component';
import { DoReservationComponent } from './do-reservation/do-reservation.component';
import { PublicHomeComponent } from './public-home/public-home.component';
import { ViewreservationsComponent } from './viewreservations/viewreservations.component';

const routes: Routes = [
  {path:'',redirectTo:'publichome',pathMatch:'full'},
  {path:'publichome', component:PublicHomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'user', component:UserhomeComponent},
  {path:'profile', component:ProfileComponent},
  {path:'viewreservation', component:ViewreservationsComponent},
  {path:'doReservation', component:DoReservationComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
