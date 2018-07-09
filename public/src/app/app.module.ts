import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{ TasksService } from './tasks.service'
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { BakerComponent } from './baker/baker.component';
import { HomeComponent } from './home/home.component';
// import { NewAuthorComponent } from './new-author/new-author.component';
// import { EditAuthorComponent } from './edit-author/edit-author.component';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    // BakerComponent,
    HomeComponent,
    // NewAuthorComponent,
    // EditAuthorComponent,
    NewComponent,
    DetailComponent,
    RegisterComponent,
    LoginComponent,
    ChatroomComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
    
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
