import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from '../form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
  loginForm:FormGroup;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    });
  }
  onLogin(){
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    this.formService.getUserEmail(email,password);
  }
}
