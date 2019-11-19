import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { EncrDecrService } from '../../shared/encr-decr.service';
import { FormService } from '../../form.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

	loggedInUser: string;
	editForm: FormGroup;
  userName: Params;
  user: any;
  editMode: boolean = false;
  genders = ['male','female'];
  show: boolean = false;
  decrypted: string;

  constructor(private route: ActivatedRoute, private router: Router,private formService: FormService, private encrDecrService: EncrDecrService) { }

  ngOnInit(){
    this.route.params.subscribe(data => {
      this.userName = data.name;
      this.user = JSON.parse(localStorage.getItem('loggedInUser'));
      this.decrypted = this.encrDecrService.get('123456$#@$^@1ERF', this.user.password);
    });
  	this.editForm = new FormGroup({
  		'username': new FormControl(this.user.name, Validators.required),
  		'email':new FormControl(this.user.email, [Validators.required, Validators.email]),
      'password': new FormControl(this.decrypted, [Validators.required, Validators.minLength(6)]),
      'gender': new FormControl(this.user.gender, Validators.required)
  	});
  }

  onSubmit(){
    let username = this.editForm.controls.username.value;
    let email = this.editForm.controls.email.value;
    let password = this.encrDecrService.set('123456$#@$^@1ERF', this.editForm.controls.password.value);
    let gender = this.editForm.controls.gender.value;
    let userData: any[] = JSON.parse(localStorage.getItem('local_form'));
    let flag = false;
    for(let i = 0; i < userData.length; i++){
      if(userData[i].name == this.userName){
        userData[i].name = username;
        console.log(userData[i].name);
        userData[i].email = email;
        userData[i].password = password;
        userData[i].gender = gender;
        this.loggedInUser = userData[i];
        console.log(this.loggedInUser);
        flag = true;
        break;
      }
    }
    if(flag){
      console.log("User Data Updated");
    }
    else{
      console.log("Data not Found");
    }
    localStorage.setItem('local_form', JSON.stringify(userData));
    this.formService.editLoggedInUser(this.loggedInUser);
    this.router.navigate(['/about']);
  }

  clear(){
    this.editForm.reset();
  }

  show_password(){
    this.show = !this.show;
  }
}
