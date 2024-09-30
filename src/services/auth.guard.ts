import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export class authGuard implements CanActivate {


  constructor(private router:Router) { }

  
  async canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot
): Promise<boolean> {
 let user =  JSON.parse(localStorage.getItem('userDetails')!)
 // console.log(user);
 if (user != null || user.id !=' ') {
   // this.router.navigate(['/monitor']);
   return true;
   
 }
 // else { 
   this.router.navigate(['/']);
   return false;
 
 }
};
