import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { HttpClientModule  } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { DoReservationComponent } from './do-reservation/do-reservation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DoreservationService } from './doreservation.service';
import { PublicHomeComponent } from './public-home/public-home.component';
import { ReservationsService } from './reservations.service';
import { ViewreservationsComponent } from './viewreservations/viewreservations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    ProfileComponent,
    DoReservationComponent,
    SidebarComponent,
    PublicHomeComponent,
    ViewreservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [UserService, DoreservationService,ReservationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
