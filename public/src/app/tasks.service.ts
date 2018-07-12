import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
//   {
//   providedIn: 'root',
// })
export class TasksService {

  constructor(private _http: HttpClient) {

  }
  register(regform) {
    console.log(regform)
    return this._http.post('/register', regform)
  }
  login(logform) {
    return this._http.post('/login', logform)
  }
  logout() {
    return this._http.get('/logout')
  }
  addDish(newDish) {
    return this._http.post('/addDish', newDish)
  }
  showDish() {
    return this._http.get('/showDish')
  }
  dishes() {
    return this._http.get('/dishes')
  }
  getOneDish(id) {
    console.log(id)
    return this._http.get('/getOneDish/' + id)
  }
  deleteDish(id) {
    return this._http.delete('/delete/' + id)
  }
  search(zipcode) {
    console.log(zipcode)
    return this._http.get('/search/' + zipcode)
  }
  editDish(id, dish) {
    return this._http.put('/edit/' + id, dish)
  }
  send(mail) {
    console.log(mail)
    return this._http.post('/send', mail)
  }
  find(id){
    return this._http.get('/find/' + id)
  }

}