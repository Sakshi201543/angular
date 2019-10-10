import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FormGroup } from '@angular/forms';
import { Form } from './form.model';

//key that is used to access the data in local storage

const STORAGE_KEY = 'local_form';

@Injectable()
export class FormService{

   constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

   insertFormData(form: Form){
      const fetchJsonData = this.storage.get(STORAGE_KEY) || [];
      fetchJsonData.push(form);
      this.storage.set(STORAGE_KEY, fetchJsonData);
   }

   getFormData(){
     console.log(this.storage.get(STORAGE_KEY) || 'Local Storage is empty');
   }

   getUserEmail(email, password){
     console.log(email + password);
     const dataArray = this.storage.get(STORAGE_KEY);
     for(let i=0; i<dataArray.length; i++){
       console.log(dataArray[i].email);
       if((dataArray[i].email == email) && (dataArray[i].password == password)){
         console.log("Logged In");
       }
       else {
         console.log("Incorrect credentials");
       }
     }
   }
}