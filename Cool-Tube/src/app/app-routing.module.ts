import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home/home.component';

export const routes: Routes = [
  {path:'cooltube', component: HomeComponent},
  {
    path:'', redirectTo:'cooltube', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
