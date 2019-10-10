import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataAccessService{
  constructor(private http: HttpClient){}

  getUsers(){
     return this.http.get('https://jsonplaceholder.typicode.com/photos/?_limit=5');
  }
}