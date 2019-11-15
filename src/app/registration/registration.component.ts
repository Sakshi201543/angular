import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { Form } from '../form.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: Form ;
  genders = ['male','female'];
  show: boolean;

  constructor(private formService: FormService, private fb: FormBuilder, private router: Router){
    this.show=false;
  }

  signupForm = this.fb.group({
    'username': new FormControl(null, Validators.required),
    'email': new FormControl(null,[Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'confirmpassword': new FormControl(null, Validators.required),
    'gender': new FormControl(null, Validators.required)
    },
    {
      validators: this.checkPasswords
  });


  checkPasswords(group: FormGroup){
    const pass = group.controls.password.value;
    const confPassword = group.controls.confirmpassword.value;
    return pass === confPassword ? null : { notSame: true } 
  }

  ngOnInit() {
    this.formService.getFormData();
  }

  onSubmit(){
    this.form = {name:this.signupForm.controls.username.value,
                   email:this.signupForm.controls.email.value,
                   password:this.signupForm.controls.password.value,
                   gender:this.signupForm.controls.gender.value};
    this.formService.insertFormData(this.form);
    // this.formService.getFormData();
    this.router.navigate(['/login']);

  }

  onClear(){
    this.signupForm.reset();
  }

  showPassword(){
    this.show = !this.show;
  }
}
