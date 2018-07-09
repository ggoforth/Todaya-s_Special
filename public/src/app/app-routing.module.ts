import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HomeComponent} from './home/home.component'
import{RegisterComponent} from './register/register.component'
import{NewComponent} from './new/new.component'
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component'
import{ChatroomComponent} from './chatroom/chatroom.component'

const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'new/:name', component:NewComponent},
    {path: 'food/:id', component: DetailComponent},
    {path: 'chat/:id', component: ChatroomComponent},
    {path: 'edit/:id', component: EditComponent},
    { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }