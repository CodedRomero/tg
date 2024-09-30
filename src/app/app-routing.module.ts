import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthpageComponent } from '../pages/authpage/authpage.component';
import { MainpageComponent } from '../pages/mainpage/mainpage.component';
import { authGuard } from '../services/auth.guard';

const routes: Routes = [
  {path: '', component: AuthpageComponent},
  {path: 'main', component: MainpageComponent,   
    // canActivate:[authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
