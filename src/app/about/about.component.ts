import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';

import { FormService } from '../form.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  userData:string;
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private formService: FormService) { }

  ngOnInit() {
    
    this.formService.changedLoggedInUser.subscribe(data => {
      this.userData = data;
      console.log(this.userData);
      localStorage.setItem('loggedInUser', JSON.stringify(this.userData));
    });

    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    this.userData = loggedInUser;
  }
}
