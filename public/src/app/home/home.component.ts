import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets: any;
  foods: any;
  searchFoods: any;
  findFood: Boolean;
  display: Boolean;
  private socket;

  constructor(
    private _taskService: TasksService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.showDishes()
    this.findFood = false;
    this.display = true;
    // this._route.params.subscribe((params: Params) => console.log(params['id']));
    this.socket =  socketIo('http://localhost:8000');
    this.socket.on('updateHomePage', (data)=> {
      this.showDishes()
    })
  }

  showDishes() {
    this._taskService.dishes().subscribe(res => {
      this.foods = res['data'];
      console.log(this.foods)
    })
  }

  showDetail(id){
    this._router.navigate(['/food/', id])
  }

  // goRegister(){
  //   this._router.navigate(['/register'])
  // }

  // goLogin(){
  //   this._router.navigate(['/login'])
  // }
  // goHome(){
  //   this._router.navigate(['/home'])
  // }

  search(zipcode: NgForm){
    console.log(zipcode.value)
    this._taskService.search(zipcode.value.zipcode).subscribe(res => {
      this.searchFoods = res['food'];
      this.findFood = true;
      this.display = false;
      console.log(this.searchFoods, res)
    })
  }
}
