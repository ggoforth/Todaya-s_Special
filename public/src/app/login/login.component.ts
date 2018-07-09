import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg: any;

  constructor(
    private _taskService: TasksService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login(logform:NgForm){
    this._taskService.login(logform.value).subscribe(res => {
      if(res['Login'] == true){
        this._router.navigate(['/new/' + res['user']['fname']]);
      } else {
        console.log(res)
        this.msg = res['msg']
      }
    })
  }
}
