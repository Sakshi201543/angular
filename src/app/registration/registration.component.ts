import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
//import { MustMatch } from '../_helpers/must-match.validator';
import { FormService } from '../form.service';
import { Form } from '../form.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signupForm: FormGroup;
  form: Form ;
  genders = ['male','female'];
  show: boolean;

  constructor(private formService: FormService){
   this.show=false;
  }

  ngOnInit() {
   this.signupForm = new FormGroup({
    'username': new FormControl(null, Validators.required),
    'email': new FormControl(null,[Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'confirmpassword': new FormControl(null, Validators.required),
    'gender': new FormControl(null, Validators.required)
     },
     // {
     //    validator: MustMatch('password', 'confirmPassword')
     //  }
     );
   this.formService.getFormData();
  }

  // get f() { 
  //   return this.signupForm.controls; 
  // }

  onSubmit(){
    this.form = {name:this.signupForm.controls.username.value,
                   email:this.signupForm.controls.email.value,
                   password:this.signupForm.controls.password.value,
                   gender:this.signupForm.controls.gender.value};
    this.formService.insertFormData(this.form);
    this.formService.getFormData();
  }

  onClear(){
    this.signupForm.reset();
  }

  showPassword(){
    this.show = !this.show;
  }
}
