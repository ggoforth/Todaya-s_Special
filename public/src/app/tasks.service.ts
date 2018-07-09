import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
//   {
//   providedIn: 'root',
// })
export class TasksService {

  constructor(private _http: HttpClient) {
  
   }
   register(regform){
     console.log(regform)
     return this._http.post('/register', regform)
   }
   login(logform){
    return this._http.post('/login', logform)
   }
   logout(){
    return this._http.get('/logout')
   }
   addDish(newDish){
   return this._http.post('/addDish', newDish)
 }
 showDish(){
  return this._http.get('/showDish')
 }
 dishes(){
  return this._http.get('/dishes')
 }
 getOneDish(id){
   console.log(id)
  return this._http.get('/getOneDish/' + id)
 }
deleteDish(id){
  return this._http.delete('/delete/' + id)
}
search(zipcode){
  console.log(zipcode)
  return this._http.get('/search/' + zipcode)
}
editDish(id, dish){
  return this._http.put('/edit/' + id, dish)

}






  //  getPet(){
  //   return this._http.get('/all')
  // };
   
  // showPet(id){
  //   console.log(id)
  //   return this._http.get('/show/' + id)
  // }
  // adoptPet(id){
  //   console.log(id)
  //   return this._http.delete('/delete/' + id)
  // }
  // editPet(id, ePet){
  //   console.log(id, ePet)
  //   return this._http.put('/edit/' + id, ePet)
  // }

  // likePet(body){
  //   console.log(body)
  //   return this._http.post('/like/' + body.id, body)
  // }
  // deleteTask(_id){
  //   return this._http.delete('/remove/'+_id)
  // }
  // editTask(_id, addComment){
  //   console.log(addComment)
  //   return this._http.put('/edit/'+_id, addComment)
  // }
  // addComment(newComment){

  //   return this._http.post('/comment', newComment)

  // }

  // showTask(_id){
    
  //   return this._http.get('/show/'+_id)
    
  // }
}
