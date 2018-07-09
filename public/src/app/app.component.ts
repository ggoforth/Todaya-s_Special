import { Component, OnInit } from '@angular/core';
import {TasksService} from './tasks.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  


  constructor(private _taskService: TasksService,
    private _route: ActivatedRoute,
    private _router: Router){ }
  ngOnInit(){
    const socket =  socketIo('http://localhost:8000');

    socket.on('hello', (data) => console.log(data));
   
  }
  
  goRegister(){
    this._router.navigate(['/register'])
  }

  goLogin(){
    this._router.navigate(['/login'])
  }
  goHome(){
    this._router.navigate(['/home'])
  }
    

   
}
