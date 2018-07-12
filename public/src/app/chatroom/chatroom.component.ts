import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  txt: any;
  mailOptions: any;
  foodId: any;
  food: any;
  cook: any;
  dish: any;


  constructor(
    private _taskService: TasksService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.foodId = params['id'];
    });

    this.mailOptions = {
      from: 'codingschooltesting@gmail.com',
      to: '',
      subject: 'Someone wants to buy your dish!!! REPLY NOW!',
      text: 'I would like to purchase your dish, please get back to me at ',
    }

  }

  send(myform) {
    this._taskService.find(this.foodId).subscribe(data => {
      this.food = data['data']
      this.cook = this.food.cook.email
      this.dish = this.food.dish
      this.mailOptions = {
        from: 'codingschooltesting@gmail.com',
        to: this.cook,
        subject: 'Someone wants to buy your dish!!! REPLY NOW!',
        text: 'I would like to purchase your ' + this.dish + ', please get back to me at ' + myform.value.mail + ". Message from buyer: " + myform.value.text,
      }
      this._taskService.send(this.mailOptions).subscribe(data => {
        console.log(data)
        this.mailOptions = {
          from: 'codingschooltesting@gmail.com',
          to: '',
          subject: 'Someone wants to buy your dish!!! REPLY NOW!',
          text: 'I would like to purchase your dish, please get back to me at ',
        }
          this._router.navigate(['/'])
      })
    })
  }
}
