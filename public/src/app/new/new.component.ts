import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet: any;
  msg: any;
  exist: any;
  foods: any;
  private socket;
 

  constructor(
    private _taskService: TasksService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.msg = false;
    this.showDish();
    this.socket = socketIo('http://localhost:8000')
  }

  logout(){
    this._taskService.logout().subscribe(res => {
      if(res['Login'] == false){
        this._router.navigate(['/']);
      }
    })
  }

  addNew(newDish:NgForm){
    console.log("++++++++++++++++++++++++++",newDish.value)
    this._taskService.addDish(newDish.value).subscribe(data => {
      if (data['Status'] == true){
        console.log("~~~~~~~~~~~~~~~~~~~~",data['Status'])
        console.log("successfully added", data)
        newDish.reset();
        console.log("AFTER RESET")
        this.showDish();
        console.log("AFTER SHOOOOOOOOOW DISH")
        this.socket.emit('update')
        console.log("AFTER SOCKET EMIT UPDATE IN ADD NEW")
      } else {
        console.log("ERROOROORORORRR", data)
        this.msg = data['Error']
      }
    })
  }

  showDish(){
    this._taskService.showDish().subscribe(data => {
      this.foods = data['food']
      this.socket.emit('update')
      console.log("success", data)
    })
  }

  edit(id){
    this._router.navigate(['/edit/' + id])
  }
}
