import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router){}
  
  loggedInUser = new Subject<boolean>();

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  	if(this.LoggedIn()){
      this.loggedInUser.next(true);
      return true;
  	}
  	this.router.navigate(['/login']);
    this.loggedInUser.next(false);
  	return false;
  }

  public LoggedIn(){
  	let status: boolean = false;
  	if(localStorage.getItem('LoggedIn') === 'true'){
  		status = true;
  	}
  	else{
  		status = false;
  	}
    	return status;
  }
}
