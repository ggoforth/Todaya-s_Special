import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  food: any;


  constructor(
    private _taskService: TasksService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.id = params['id'];
    });
    this.showDetail();
  }

  showDetail(){
    console.log(this.id)
    this._taskService.getOneDish(this.id).subscribe(res => {
      this.food = res['data'];
      console.log("show", res)
    })
  }

  cancel(name){
    this._router.navigate(['/new/' + name])
  }

  delete(id){
    this._taskService.deleteDish(id).subscribe(data => {
      console.log("deleted dish", data)
    })
  }

  editDish(){
    this._taskService.editDish(this.id, this.food).subscribe(res => {
      this._router.navigate(['/new/' + this.food.cook.name])
      console.log(res)
    })
  }

}
