import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
// const session = require('express-session');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regform: any;
  user: any;
  msg: any;
  invalid: any;

  constructor(
    private _taskService: TasksService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  register(regform:NgForm){
    console.log(regform.value)
    this._taskService.register(regform.value).subscribe(res => {
      console.log("show", res)
      if(res['Status'] == true){
        console.log(res)
        this._router.navigate(['/new/' + res['user']['fname']]);
      } else {
        this.invalid = res['err']
        this.msg = res['Error']
      }
    })
  }
}
