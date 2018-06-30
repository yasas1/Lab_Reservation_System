import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder ,private _router:Router, private _userService:UserService) {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    },{
      validator: this.validate.bind(this)
    }); 
    this.registrationFormGroup = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      username: ['', Validators.required],
      passwordFormGroup: this.passwordFormGroup
    }); 
  }

  validate(passwordFormGroup: FormGroup) {
    let password = passwordFormGroup.controls.password.value;
    let repeatPassword = passwordFormGroup.controls.repeatPassword.value;

    if (repeatPassword.length <= 0) {
        return null;
    }
    if (repeatPassword !== password) {
        return {
            doesMatchPassword: true
        };
    }
    return null;
 }


  ngOnInit() {
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

  register(){

    if(!this.registrationFormGroup.valid || (this.registrationFormGroup.controls.password.value != this.registrationFormGroup.controls.cpass.value)){
      console.log("Invalid Form"); return;
    }

    this._userService.register(JSON.stringify(this.registrationFormGroup.value))
    .subscribe(
      data=>{console.log(data), this._router.navigate(['/login'])},
      error=>console.error(error)
    )
    //console.log(JSON.stringify(this.registerForm.value));
  }

}
