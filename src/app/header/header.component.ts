import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	userLoggedIn: boolean = false;
	subscription: Subscription;
  
  constructor(private auth: AuthGuard) { }

  ngOnInit(){
  	this.subscription = this.auth.loggedInUser.subscribe(data => {
  		this.userLoggedIn = data;
  	});
  }

  logOut(){
  	this.userLoggedIn = false;
  }
  
  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }
}
