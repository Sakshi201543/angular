import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Form } from './form.model';

@Injectable()
export class FormService{

  constructor(){}

  changedLoggedInUser = new Subject<string>();

  insertFormData(form: Form){
    let fetchJsonData = [];
    fetchJsonData = JSON.parse(localStorage.getItem('local_form')) || [];
    fetchJsonData.push(form);
    localStorage.setItem('local_form', JSON.stringify(fetchJsonData));
  }

  getFormData(){
    console.log(localStorage.getItem('local_form') || 'Local Storage is empty');
  }

  getUserEmail(email, password){
    let status: boolean = false;
    const dataArray = JSON.parse(localStorage.getItem('local_form'));
    for(let i = 0; i < dataArray.length; i++){
      if((dataArray[i].email == email) && (dataArray[i].password == password)){
        localStorage.setItem('LoggedIn', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(dataArray[i]));
        console.log("Logged In");
        status = true;
        return status;
      }
    }
    return status;
  }

  editLoggedInUser(loggedInUser: any){
    this.changedLoggedInUser.next(loggedInUser);
  }
}