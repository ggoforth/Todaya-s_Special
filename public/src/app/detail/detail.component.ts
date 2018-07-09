import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  food: any;
  id: any;
  likes: Number;
  button: Boolean;

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
  chatClicked(cook){
    this._router.navigate(['/chat/', cook._id])

  }
}
