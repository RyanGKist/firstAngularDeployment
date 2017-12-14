import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'Rxjs';

@Injectable()
export class AppService {
  tasks = new BehaviorSubject([]);
  errors = new BehaviorSubject([]);
  response = new BehaviorSubject([]);
  user = new BehaviorSubject ([]);

  constructor(private _http: HttpClient) {
    this.retrieveAll();
    
   }

  retrieveAll(){
    this._http.get('http://localhost:8000/tasks').subscribe(
    (task: any[]) => {this.tasks.next(task);}, 
    (error: any[]) => {this.errors.next(error);}
    )
  }
  createTask(data){
    this._http.post('http://localhost:8000/tasks', data).subscribe(
      (response)=>this.retrieveAll(),
      (error) => {this.errors.next(error)},
    )
  }
  deleteTask(data){
    this._http.delete('http://localhost:8000/delete/'+ data).subscribe(   
      (response) => {this.retrieveAll(); console.log('success')},
      (error) => {this.errors.next(error)},
    )
  }
  editTask(id,data){
    this._http.put('http://localhost:8000/edit/'+id,data).subscribe(
      (user)=>{this.retrieveAll();},
      (error) => {this.errors.next(error)},
    )
  }
  findOne(id){
    this._http.get('http://localhost:8000/findone/'+id).subscribe(
      (user: any[]) => {this.user.next(user)},
      (error) => {this.errors.next(error)},
    )
  }
}
