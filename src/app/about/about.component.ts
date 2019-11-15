import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  userData: string;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    this.userData = loggedInUser;
    console.log(this.userData);
  }
  logout(){
  	this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
