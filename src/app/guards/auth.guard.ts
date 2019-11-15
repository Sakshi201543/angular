import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  	if(this.LoggedIn()){
      return true;
  	}
  	this.router.navigate(['/login']);
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
