import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,  private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //console.log('CanActivate called');
    let isLoggedIn = this.authService.isAuthenticadted();
    if(isLoggedIn){
      return true
    }
    else {
      if(localStorage.getItem('token') === ''){
        this.router.navigate(['/login']);
        return false
      }
      else {
        //console.log('Iniciado y con token')
        return true
      }
    }
  }
  
}
