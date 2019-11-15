import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	userLoggedIn: boolean = false;
  
  constructor(private auth: AuthGuard) { }

  ngOnInit(){
  	this.auth.loggedInUser.subscribe(data => {
  		this.userLoggedIn = data;
  	});
  }

  logOut(){
  	this.userLoggedIn = false;
  }
}
