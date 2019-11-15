import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { AuthService } from '../auth-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
  loginForm:FormGroup;
  returnUrl: string;
  message: string = null;

  constructor(private formService: FormService, private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    });
    this.returnUrl = '/about';
    this.authService.logOut();
  } 
  
  onLogin(){
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    if(this.formService.getUserEmail(email,password)){
      this.router.navigate([this.returnUrl]);
    }
    else{
      this.message = "Please check your email and password";
    }
  }
}
